import { useMutation, useMutationState } from "@tanstack/react-query"
import type { SearchParams } from "@/entities/articles/model/types"
import { searchArticles } from "@/shared/api/articles"

export const SEARCH_ARTICLES_KEY = ["searchArticles"]

export function useSearchArticles() {
	const mutation = useMutation<unknown, Error, SearchParams>({
		mutationKey: SEARCH_ARTICLES_KEY,
		mutationFn: searchArticles,
	})

	return {
		search: mutation.mutate,
		isPending: mutation.isPending,
	}
}

export function useGetArticlesAfterSearch() {
	const mutations = useMutationState({
		filters: { mutationKey: SEARCH_ARTICLES_KEY },
		select: (m) => m.state,
	})

	const last = mutations[mutations.length - 1]

	return {
		data: last?.data,
		error: last?.error as Error | undefined,
		status: last?.status,
		hasResult: !!last,
	}
}
