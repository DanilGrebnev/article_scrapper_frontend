import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthForm } from "@/entities/user"
import type { AuthParams } from "@/entities/user"
import { useAuth } from "@/app/auth/AuthProvider"
import styles from "./AuthPage.module.scss"

export function AuthPage() {
	const navigate = useNavigate()
	const { login } = useAuth()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleAuth = async (params: AuthParams) => {
		setError(null)
		setIsPending(true)
		try {
			await login(params)
			navigate("/", { replace: true })
		} catch {
			setError("Неверный логин или пароль")
		} finally {
			setIsPending(false)
		}
	}

	return (
		<div className={styles.page}>
			{error && (
				<p className={styles.error}>{error}</p>
			)}
			<AuthForm onSubmit={handleAuth} isPending={isPending} />
			<p className={styles.footer}>
				Нет аккаунта?{" "}
				<a
					href="/register"
					className={styles.footerLink}
					onClick={(e) => {
						e.preventDefault()
						navigate("/register")
					}}
				>
					Зарегистрироваться
				</a>
			</p>
		</div>
	)
}
