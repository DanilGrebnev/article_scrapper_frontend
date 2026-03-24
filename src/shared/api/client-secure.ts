import ky from "ky"
import { API_BASE_URL } from "@/shared/config/api"
import { getAccessToken } from "./token-store"
import { refreshAccessToken } from "./token-refresh"

export const apiClientSecure = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: false,
	retry: {
		limit: 1,
		methods: ["get", "post", "put", "patch", "delete", "head", "options"],
		statusCodes: [401],
		delay: () => 0,
	},
	hooks: {
		beforeRequest: [
			(request) => {
				const token = getAccessToken()
				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`)
				}
			},
		],
		beforeRetry: [
			async ({ error }) => {
				const refreshed = await refreshAccessToken()
				if (!refreshed) throw error
			},
		],
	},
})
