import type { TokenBundle } from "@/entities/user/model/types"
import { postRefresh } from "./auth"
import { getRefreshToken, setTokens, clearTokens } from "./token-store"

let refreshPromise: Promise<boolean> | null = null
let onSessionInvalidated: (() => void) | null = null

export function setOnSessionInvalidated(cb: () => void): void {
	onSessionInvalidated = cb
}

export function applyTokenBundle(bundle: TokenBundle): void {
	setTokens(bundle.access_token, bundle.refresh_token)
}

export async function refreshAccessToken(): Promise<boolean> {
	if (refreshPromise) return refreshPromise

	refreshPromise = (async () => {
		const token = getRefreshToken()
		if (!token) {
			clearTokens()
			onSessionInvalidated?.()
			return false
		}
		try {
			const bundle = await postRefresh(token)
			applyTokenBundle(bundle)
			return true
		} catch {
			clearTokens()
			onSessionInvalidated?.()
			return false
		}
	})()

	try {
		return await refreshPromise
	} finally {
		refreshPromise = null
	}
}
