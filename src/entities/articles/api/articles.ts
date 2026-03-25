import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getJobId, setJobId, clearJobId } from "../lib/jobIdStore"
import { startArticleSearch, checkSearchStatus } from "./articleSearchService"
import type {
	SearchParams,
	TArticleHistoryDetail,
	CheckSearchResponse,
} from "../model/types"

export const ARTICLE_SEARCH_RESULT_KEY = ["articleSearchResult"]

// ─── useStartSearch ──────────────────────────────────────────────────────────

export interface UseStartSearchReturn {
	/** true пока идёт POST-запрос на запуск поиска */
	isPending: boolean
	/** Ошибка запуска (сеть, 4xx и т.д.) */
	error: string | null
	/** Отправляет параметры поиска; при успехе возвращает request_id задачи */
	start: (params: SearchParams) => Promise<string | null>
}

/**
 * Отвечает только за старт поиска.
 * POST article-search → сохраняет request_id в localStorage → возвращает request_id.
 * При ошибке возвращает null и заполняет error.
 */
export function useStartSearch(): UseStartSearchReturn {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const start = useCallback(
		async (params: SearchParams): Promise<string | null> => {
			setIsPending(true)
			setError(null)
			try {
				const { request_id } = await startArticleSearch(params)
				setJobId(request_id)
				return request_id
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при запуске поиска",
				)
				return null
			} finally {
				setIsPending(false)
			}
		},
		[],
	)

	return { isPending, error, start }
}

// ─── useCheckResult ───────────────────────────────────────────────────────────

/** Статус polling, отдаваемый наружу: process/error + сообщение, или null (покой/success). */
export type PollStatusData = { status: "process" | "error"; message: string }

export interface UseCheckResultReturn {
	/** true пока идёт polling */
	isPolling: boolean
	/** Последний status + message из check-search (null при покое и после success) */
	data: PollStatusData | null
	/** Запустить polling для указанного id */
	poll: (id: string) => void
	/** Остановить polling вручную */
	stop: () => void
}

/**
 * Отвечает только за polling статуса задачи.
 * Принимает id (из useStartSearch или из localStorage при bootstrap).
 * При status === "error" прекращает опрос и очищает id из localStorage.
 * При status === "success" сохраняет результат в кеш React Query и очищает id.
 * При abort (размонтирование / ручной stop) — молча выходит.
 */
export function useCheckResult(): UseCheckResultReturn {
	const queryClient = useQueryClient()
	const [isPolling, setIsPolling] = useState(false)
	const [data, setData] = useState<PollStatusData | null>(null)
	const abortRef = useRef<AbortController | null>(null)

	const stop = useCallback(() => {
		abortRef.current?.abort()
	}, [])

	const handleResponse = useCallback((response: CheckSearchResponse) => {
		if (response.status === "process" || response.status === "error") {
			setData({ status: response.status, message: response.message })
		}
	}, [])

	const poll = useCallback(
		(id: string) => {
			abortRef.current?.abort()
			const controller = new AbortController()
			abortRef.current = controller

			setIsPolling(true)
			setData(null)

			checkSearchStatus(id, {
				signal: controller.signal,
				onResponse: handleResponse,
			})
				.then((result) => {
					clearJobId()
					setData(null)
					queryClient.setQueryData(ARTICLE_SEARCH_RESULT_KEY, result)
				})
				.catch((err) => {
					if (
						err instanceof DOMException &&
						err.name === "AbortError"
					)
						return
					clearJobId()
					const message =
						err instanceof Error
							? err.message
							: "Ошибка при проверке статуса поиска"
					setData({ status: "error", message })
				})
				.finally(() => {
					if (!controller.signal.aborted) {
						setIsPolling(false)
					}
				})
		},
		[queryClient, handleResponse],
	)

	useEffect(() => {
		return () => abortRef.current?.abort()
	}, [])

	return { isPolling, data, poll, stop }
}

// ─── useBootstrapSearch ───────────────────────────────────────────────────────

/**
 * При монтировании проверяет localStorage на наличие незавершённого job id.
 * Если id найден — автоматически запускает poll из useCheckResult.
 * Гарантирует однократное выполнение через ref.
 */
export function useBootstrapSearch(poll: (id: string) => void) {
	const didBootstrap = useRef(false)

	useEffect(() => {
		if (didBootstrap.current) return
		didBootstrap.current = true
		const savedId = getJobId()
		if (savedId) poll(savedId)
	}, [poll])
}

// ─── useArticleSearchResult ───────────────────────────────────────────────────

/**
 * Читает последний успешный результат поиска из кеша React Query.
 * Используется в SearchResults и SearchDetailPage.
 */
export function useArticleSearchResult() {
	const queryClient = useQueryClient()
	return (
		queryClient.getQueryData<TArticleHistoryDetail>(ARTICLE_SEARCH_RESULT_KEY) ??
		null
	)
}
