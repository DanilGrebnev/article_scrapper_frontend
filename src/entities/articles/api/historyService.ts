import { apiClientSecure } from "@/shared/api/client-secure"
import type { HistoryListItem, SearchResponse } from "../model/types"

/**
 * GET api/history — список всех запросов текущего пользователя.
 */
export function fetchHistoryList(): Promise<HistoryListItem[]> {
	return apiClientSecure.get("history").json<HistoryListItem[]>()
}

/**
 * GET api/history-detail?id=<id> — детальный результат конкретного запроса.
 * Ответ соответствует SearchResponse (high_match / medium_match / low_match).
 */
export function fetchHistoryDetail(id: number): Promise<SearchResponse> {
	return apiClientSecure
		.get("history-detail", { searchParams: { id: String(id) } })
		.json<SearchResponse>()
}
