import { useNavigate } from "react-router-dom"
import { Box, Container, Typography } from "@mui/material"
import { AuthForm } from "@/entities/user"
import type { AuthParams } from "@/entities/user"

export function AuthPage() {
	const navigate = useNavigate()

	const handleAuth = (params: AuthParams) => {
		console.log("auth", params)
		navigate("/")
	}

	return (
		<Container maxWidth="xs" sx={{ py: 4 }}>
			<AuthForm onSubmit={handleAuth} />
			<Box sx={{ mt: 2, textAlign: "center" }}>
				<Typography variant="body2" color="text.secondary">
					Нет аккаунта?{" "}
					<Typography
						component="a"
						href="/register"
						variant="body2"
						color="primary"
						onClick={(e) => {
							e.preventDefault()
							navigate("/register")
						}}
						sx={{ cursor: "pointer" }}
					>
						Зарегистрироваться
					</Typography>
				</Typography>
			</Box>
		</Container>
	)
}
