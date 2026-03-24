import { Navigate } from "react-router-dom"
import { Spinner } from "@heroui/react"
import { useAuth } from "./AuthProvider"
import type { ReactNode } from "react"

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthReady, isAuthenticated } = useAuth()

	if (!isAuthReady) {
		return (
			<div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
				<Spinner size="lg" />
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return <>{children}</>
}
