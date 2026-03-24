import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterForm } from "@/entities/user"
import type { RegisterParams } from "@/entities/user"
import { register as apiRegister } from "@/shared/api/auth"
import styles from "./RegisterPage.module.scss"

export function RegisterPage() {
	const navigate = useNavigate()
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleRegister = async (params: RegisterParams) => {
		setError(null)
		setIsPending(true)
		try {
			await apiRegister(params)
			navigate("/login")
		} catch {
			setError("Ошибка регистрации. Попробуйте другой email или username.")
		} finally {
			setIsPending(false)
		}
	}

	return (
		<div className={styles.page}>
			{error && (
				<p className={styles.error}>{error}</p>
			)}
			<RegisterForm onSubmit={handleRegister} isPending={isPending} />
			<p className={styles.footer}>
				Уже есть аккаунт?{" "}
				<a
					href="/login"
					className={styles.footerLink}
					onClick={(e) => {
						e.preventDefault()
						navigate("/login")
					}}
				>
					Войти
				</a>
			</p>
		</div>
	)
}
