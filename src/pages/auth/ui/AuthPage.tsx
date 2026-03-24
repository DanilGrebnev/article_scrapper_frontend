import { useNavigate } from "react-router-dom"
import { AuthForm } from "@/entities/user"
import type { AuthParams } from "@/entities/user"
import styles from "./AuthPage.module.scss"

export function AuthPage() {
	const navigate = useNavigate()

	const handleAuth = (params: AuthParams) => {
		console.log("auth", params)
		navigate("/")
	}

	return (
		<div className={styles.page}>
			<AuthForm onSubmit={handleAuth} />
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
