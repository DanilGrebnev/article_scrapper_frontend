import type { SearchParams } from "@/entities/articles/model/types"
import { apiClient } from "./client"

export const searchArticles = (params: SearchParams): Promise<unknown> => {
	return apiClient.post("article-search", { json: params }).json()
}
