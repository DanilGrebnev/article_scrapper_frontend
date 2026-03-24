import { useForm } from "react-hook-form"
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import type { AuthParams } from "../../model/types"

interface AuthFormProps {
	onSubmit: (params: AuthParams) => void
	isPending?: boolean
}

/**
 * Форма авторизации: email и пароль.
 */
export function AuthForm({ onSubmit, isPending }: AuthFormProps) {
	const { register, handleSubmit } = useForm<AuthParams>({
		defaultValues: {
			email: "",
			password: "",
		},
	})

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Typography variant="h5" component="h1" gutterBottom>
				Авторизация
			</Typography>
			<Stack spacing={2}>
				<TextField
					label="Email"
					type="email"
					size="small"
					fullWidth
					required
					{...register("email", { required: true })}
				/>
				<TextField
					label="Пароль"
					type="password"
					size="small"
					fullWidth
					required
					{...register("password", { required: true })}
				/>
				<Button
					type="submit"
					variant="contained"
					size="small"
					disabled={isPending}
					startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
				>
					Войти
				</Button>
			</Stack>
		</Box>
	)
}
