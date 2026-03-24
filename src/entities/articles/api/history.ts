import { useQuery } from "@tanstack/react-query"
import { fetchHistoryList, fetchHistoryDetail } from "./historyService"

export const HISTORY_LIST_KEY = ["articleHistory"]

/**
 * Загружает список запросов текущего пользователя.
 */
export function useHistoryList() {
	return useQuery({
		queryKey: HISTORY_LIST_KEY,
		queryFn: fetchHistoryList,
	})
}

/**
 * Загружает детальный результат конкретного запроса по id.
 * Запрос не выполняется пока id === null.
 */
export function useHistoryDetail(id: number | null) {
	return useQuery({
		queryKey: ["historyDetail", id],
		queryFn: () => fetchHistoryDetail(id!),
		enabled: id != null,
	})
}
