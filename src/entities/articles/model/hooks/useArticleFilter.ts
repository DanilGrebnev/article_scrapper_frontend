import { useMemo, useState } from "react"
import type { MatchedArticle, SearchResponse } from "../types"

function matchesQuery(article: MatchedArticle, query: string): boolean {
	const q = query.toLowerCase()
	return (
		article.t_title?.toLowerCase().includes(q) ||
		article.t_abstract?.toLowerCase().includes(q) ||
		article.authors?.toLowerCase().includes(q) ||
		false
	)
}

export function useArticleFilter(response: SearchResponse) {
	const [query, setQuery] = useState("")

	const filtered = useMemo(() => {
		if (!query.trim()) return response

		const filter = (articles: MatchedArticle[]) =>
			articles.filter((a) => matchesQuery(a, query))

		return {
			high_match: filter(response.high_match ?? []),
			medium_match: filter(response.medium_match ?? []),
			low_match: filter(response.low_match ?? []),
		}
	}, [query, response])

	return { query, setQuery, filtered }
}
