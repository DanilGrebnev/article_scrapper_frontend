import { useNavigate } from "react-router-dom"
import { Box, Container, Typography } from "@mui/material"
import { RegisterForm } from "@/entities/user"
import type { RegisterParams } from "@/entities/user"

export function RegisterPage() {
	const navigate = useNavigate()

	const handleRegister = (params: RegisterParams) => {
		console.log("register", params)
		navigate("/login")
	}

	return (
		<Container maxWidth="xs" sx={{ py: 4 }}>
			<RegisterForm onSubmit={handleRegister} />
			<Box sx={{ mt: 2, textAlign: "center" }}>
				<Typography variant="body2" color="text.secondary">
					Уже есть аккаунт?{" "}
					<Typography
						component="a"
						href="/login"
						variant="body2"
						color="primary"
						onClick={(e) => {
							e.preventDefault()
							navigate("/login")
						}}
						sx={{ cursor: "pointer" }}
					>
						Войти
					</Typography>
				</Typography>
			</Box>
		</Container>
	)
}
