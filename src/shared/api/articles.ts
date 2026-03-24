import type { SearchParams } from "@/entities/articles/model/types"
import { apiClientSecure } from "./client-secure"

export const searchArticles = (params: SearchParams): Promise<unknown> => {
	return apiClientSecure.post("article-search", { json: params }).json()
}
