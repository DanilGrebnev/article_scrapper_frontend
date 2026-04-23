import type { SearchParams } from "../model/types"

const LAST_SEARCH_PARAMS_KEY = "article_search_last_params"

function isBrowser() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function loadLastSearchParams(): SearchParams | null {
	if (!isBrowser()) return null

	const raw = window.localStorage.getItem(LAST_SEARCH_PARAMS_KEY)
	if (!raw) return null

	try {
		return JSON.parse(raw) as SearchParams
	} catch (error) {
		console.warn("Failed to parse saved search params", error)
		return null
	}
}

export function saveLastSearchParams(params: SearchParams): void {
	if (!isBrowser()) return

	try {
		window.localStorage.setItem(
			LAST_SEARCH_PARAMS_KEY,
			JSON.stringify(params ?? {}),
		)
	} catch (error) {
		console.warn("Failed to save search params", error)
	}
}

export function clearLastSearchParams(): void {
	if (!isBrowser()) return

	try {
		window.localStorage.removeItem(LAST_SEARCH_PARAMS_KEY)
	} catch (error) {
		console.warn("Failed to clear saved search params", error)
	}
}
