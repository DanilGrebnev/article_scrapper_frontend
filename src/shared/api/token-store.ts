const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export function getAccessToken(): string | null {
	return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | null {
	return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(accessToken: string, refreshToken: string): void {
	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens(): void {
	localStorage.removeItem(ACCESS_TOKEN_KEY)
	localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function decodeJwtPayload(token: string): Record<string, unknown> | null {
	try {
		const part = token.split(".")[1]
		if (!part) return null
		const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"))
		return JSON.parse(json)
	} catch {
		return null
	}
}
