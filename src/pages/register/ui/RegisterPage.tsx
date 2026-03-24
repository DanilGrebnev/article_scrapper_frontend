import { useNavigate } from "react-router-dom"
import { RegisterForm } from "@/entities/user"
import type { RegisterParams } from "@/entities/user"
import styles from "./RegisterPage.module.scss"

export function RegisterPage() {
	const navigate = useNavigate()

	const handleRegister = (params: RegisterParams) => {
		console.log("register", params)
		navigate("/login")
	}

	return (
		<div className={styles.page}>
			<RegisterForm onSubmit={handleRegister} />
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
