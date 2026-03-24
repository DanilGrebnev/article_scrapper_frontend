import { useCallback, useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { getJobId, setJobId, clearJobId } from "../lib/jobIdStore"
import { startArticleSearch, checkSearchStatus } from "./articleSearchService"
import type { SearchParams, SearchResponse } from "../model/types"

export const ARTICLE_SEARCH_RESULT_KEY = ["articleSearchResult"]

export interface ArticleSearchJobState {
	isBusy: boolean
	error: string | null
	statusMessage: string | null
	data: SearchResponse | null
	startSearch: (params: SearchParams) => void
}

/**
 * Оркестратор поиска статей.
 * При монтировании восстанавливает незавершённый поиск из localStorage.
 * startSearch — запускает новый поиск (POST + polling).
 * Результат сохраняется в кеш React Query (ARTICLE_SEARCH_RESULT_KEY).
 */
export function useArticleSearchJob(): ArticleSearchJobState {
	const queryClient = useQueryClient()
	const [isBusy, setIsBusy] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [statusMessage, setStatusMessage] = useState<string | null>(null)
	const abortRef = useRef<AbortController | null>(null)
	const didBootstrap = useRef(false)

	const poll = useCallback(
		async (jobId: string) => {
			abortRef.current?.abort()
			const controller = new AbortController()
			abortRef.current = controller

			setIsBusy(true)
			setError(null)

			try {
				const result = await checkSearchStatus(jobId, {
					signal: controller.signal,
					onProcess: (msg) => setStatusMessage(msg),
				})
				clearJobId()
				queryClient.setQueryData(ARTICLE_SEARCH_RESULT_KEY, result)
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError")
					return
				clearJobId()
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при проверке статуса поиска",
				)
			} finally {
				if (!controller.signal.aborted) {
					setIsBusy(false)
					setStatusMessage(null)
				}
			}
		},
		[queryClient],
	)

	useEffect(() => {
		if (didBootstrap.current) return
		didBootstrap.current = true
		const existingId = getJobId()
		if (existingId) poll(existingId)
	}, [poll])

	useEffect(() => {
		return () => abortRef.current?.abort()
	}, [])

	const startSearch = useCallback(
		async (params: SearchParams) => {
			abortRef.current?.abort()
			setIsBusy(true)
			setError(null)
			setStatusMessage(null)
			queryClient.removeQueries({ queryKey: ARTICLE_SEARCH_RESULT_KEY })

			try {
				const { id } = await startArticleSearch(params)
				setJobId(id)
				poll(id)
			} catch (err) {
				setIsBusy(false)
				setError(
					err instanceof Error
						? err.message
						: "Ошибка при запуске поиска",
				)
			}
		},
		[queryClient, poll],
	)

	const data =
		queryClient.getQueryData<SearchResponse>(ARTICLE_SEARCH_RESULT_KEY) ??
		null

	return { isBusy, error, statusMessage, data, startSearch }
}

/**
 * Читает последний успешный результат поиска из кеша React Query.
 * Используется в SearchResults и SearchDetailPage.
 */
export function useArticleSearchResult() {
	const queryClient = useQueryClient()
	return (
		queryClient.getQueryData<SearchResponse>(ARTICLE_SEARCH_RESULT_KEY) ??
		null
	)
}
