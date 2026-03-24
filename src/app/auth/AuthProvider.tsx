import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
	type ReactNode,
} from "react"
import { login as apiLogin, logout as apiLogout } from "@/shared/api/auth"
import {
	getRefreshToken,
	getAccessToken,
	clearTokens,
	decodeJwtPayload,
} from "@/shared/api/token-store"
import {
	refreshAccessToken,
	applyTokenBundle,
	setOnSessionInvalidated,
} from "@/shared/api/token-refresh"
import type { AuthParams, User } from "@/entities/user/model/types"

interface AuthContextValue {
	isAuthReady: boolean
	isAuthenticated: boolean
	user: User | null
	login: (params: AuthParams) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within AuthProvider")
	return ctx
}

function getUserFromToken(): User | null {
	const token = getAccessToken()
	if (!token) return null
	const payload = decodeJwtPayload(token)
	if (!payload) return null
	return {
		username:
			(payload.username as string) ?? (payload.sub as string) ?? "",
		email: (payload.email as string) ?? "",
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthReady, setIsAuthReady] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<User | null>(null)
	const didBootstrap = useRef(false)

	useEffect(() => {
		setOnSessionInvalidated(() => {
			clearTokens()
			setIsAuthenticated(false)
			setUser(null)
			window.location.href = "/login"
		})
	}, [])

	useEffect(() => {
		if (didBootstrap.current) return
		didBootstrap.current = true

		const bootstrap = async () => {
			const refreshToken = getRefreshToken()
			if (!refreshToken) {
				setIsAuthReady(true)
				return
			}
			const ok = await refreshAccessToken()
			if (ok) {
				setIsAuthenticated(true)
				setUser(getUserFromToken())
			}
			setIsAuthReady(true)
		}
		bootstrap()
	}, [])

	const handleLogin = useCallback(async (params: AuthParams) => {
		const bundle = await apiLogin(params)
		applyTokenBundle(bundle)
		setIsAuthenticated(true)
		setUser(getUserFromToken())
	}, [])

	const handleLogout = useCallback(async () => {
		const refreshToken = getRefreshToken()
		if (refreshToken) {
			try {
				await apiLogout(refreshToken)
			} catch {
				/* ignore */
			}
		}
		clearTokens()
		setIsAuthenticated(false)
		setUser(null)
	}, [])

	return (
		<AuthContext.Provider
			value={{
				isAuthReady,
				isAuthenticated,
				user,
				login: handleLogin,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
