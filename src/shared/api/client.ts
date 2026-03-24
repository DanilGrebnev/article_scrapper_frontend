import ky from "ky"
import { API_BASE_URL } from "@/shared/config/api"

export const apiClient = ky.create({
	prefixUrl: API_BASE_URL,
	timeout: false,
})
