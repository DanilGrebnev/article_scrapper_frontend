import { apiClientSecure } from "@/shared/api/client-secure"
import type {
	SearchParams,
	SearchResponse,
	ArticleSearchStartResponse,
	CheckSearchResponse,
} from "../model/types"

const POLL_INTERVAL_MS = 3000

/**
 * Запускает поиск статей на бэкенде.
 * POST api/article-search — ответ: { request_id, status }.
 */
export function startArticleSearch(
	params: SearchParams,
): Promise<ArticleSearchStartResponse> {
	return apiClientSecure
		.post("article-search", { json: params })
		.json<ArticleSearchStartResponse>()
}

/**
 * Один запрос проверки статуса задачи.
 * POST api/check-search — тело `{ request_id }`, ответ: status (process | error | success).
 */
export function fetchCheckSearch(
	request_id: string,
): Promise<CheckSearchResponse> {
	return apiClientSecure
		.post("check-search", { json: { request_id } })
		.json<CheckSearchResponse>()
}

/**
 * Промис-пауза с поддержкой отмены через AbortSignal.
 */
export function delay(ms: number, signal?: AbortSignal): Promise<void> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(resolve, ms)
		signal?.addEventListener(
			"abort",
			() => {
				clearTimeout(timer)
				reject(new DOMException("Aborted", "AbortError"))
			},
			{ once: true },
		)
	})
}

export interface CheckSearchStatusOptions {
	signal?: AbortSignal
	intervalMs?: number
	/** Вызывается на каждый распарсенный ответ check-search (до ветвления по status). */
	onResponse?: (response: CheckSearchResponse) => void
}

/**
 * Polling-цикл: опрашивает check-search с интервалом до получения
 * финального статуса (success — результат, error — throw).
 * При сетевых ошибках останавливает polling и пробрасывает исключение.
 * Поддерживает AbortSignal для отмены и колбэк onResponse для каждого ответа.
 */
export async function checkSearchStatus(
	id: string,
	options?: CheckSearchStatusOptions,
): Promise<SearchResponse> {
	const interval = options?.intervalMs ?? POLL_INTERVAL_MS
	const signal = options?.signal

	while (true) {
		if (signal?.aborted) {
			throw new DOMException("Aborted", "AbortError")
		}

		let response: CheckSearchResponse
		try {
			response = await fetchCheckSearch(id)
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError")
				throw err
			throw err instanceof Error
				? err
				: new Error("Ошибка при проверке статуса поиска")
		}

		options?.onResponse?.(response)

		switch (response.status) {
			case "success":
				return response.result

			case "error":
				throw new Error(response.message)

			case "process":
				await delay(interval, signal)
				break
		}
	}
}
