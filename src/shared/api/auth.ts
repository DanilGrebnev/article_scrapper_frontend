import type { TokenBundle, AuthParams, RegisterParams } from "@/entities/user/model/types"
import { apiClient } from "./client"

export function register(params: RegisterParams): Promise<unknown> {
	return apiClient.post("auth/register", { json: params }).json()
}

export function login(params: AuthParams): Promise<TokenBundle> {
	return apiClient.post("auth/login", { json: params }).json<TokenBundle>()
}

export function postRefresh(refreshToken: string): Promise<TokenBundle> {
	return apiClient
		.post("auth/refresh", { json: { refresh_token: refreshToken } })
		.json<TokenBundle>()
}

export function logout(refreshToken: string): Promise<unknown> {
	return apiClient.post("auth/logout", { json: { refresh_token: refreshToken } }).json()
}
