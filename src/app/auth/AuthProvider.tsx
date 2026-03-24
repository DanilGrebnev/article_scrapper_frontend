import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useRef,
	type ReactNode,
} from "react"
import {
	login as apiLogin,
	logout as apiLogout,
	fetchProfile,
} from "@/shared/api/auth"
import {
	getRefreshToken,
	clearTokens,
} from "@/shared/api/token-store"
import {
	refreshAccessToken,
	applyTokenBundle,
	setOnSessionInvalidated,
} from "@/shared/api/token-refresh"
import type { AuthParams, UserProfile } from "@/entities/user/model/types"

interface AuthContextValue {
	isAuthReady: boolean
	isAuthenticated: boolean
	user: UserProfile | null
	login: (params: AuthParams) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within AuthProvider")
	return ctx
}

async function loadProfile(): Promise<UserProfile | null> {
	try {
		return await fetchProfile()
	} catch {
		return null
	}
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthReady, setIsAuthReady] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<UserProfile | null>(null)
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
				setUser(await loadProfile())
			}
			setIsAuthReady(true)
		}
		bootstrap()
	}, [])

	const handleLogin = useCallback(async (params: AuthParams) => {
		const bundle = await apiLogin(params)
		applyTokenBundle(bundle)
		setIsAuthenticated(true)
		setUser(await loadProfile())
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
