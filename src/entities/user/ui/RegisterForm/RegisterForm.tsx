import { useForm } from "react-hook-form"
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import type { RegisterParams } from "../../model/types"

interface RegisterFormProps {
	onSubmit: (params: RegisterParams) => void
	isPending?: boolean
}

/**
 * Форма регистрации: email, пароль и подтверждение пароля.
 */
export function RegisterForm({ onSubmit, isPending }: RegisterFormProps) {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterParams>({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Typography variant="h5" component="h1" gutterBottom>
				Регистрация
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
					{...register("password", { required: true, minLength: 6 })}
					error={!!errors.password}
					helperText={errors.password?.type === "minLength" ? "Минимум 6 символов" : ""}
				/>
				<TextField
					label="Подтвердите пароль"
					type="password"
					size="small"
					fullWidth
					required
					{...register("confirmPassword", {
						required: true,
						validate: (val) => val === watch("password") || "Пароли не совпадают",
					})}
					error={!!errors.confirmPassword}
					helperText={errors.confirmPassword?.message}
				/>
				<Button
					type="submit"
					variant="contained"
					size="small"
					disabled={isPending}
					startIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}
				>
					Зарегистрироваться
				</Button>
			</Stack>
		</Box>
	)
}
