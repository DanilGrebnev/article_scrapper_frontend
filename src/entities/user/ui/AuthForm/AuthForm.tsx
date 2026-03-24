import { useForm } from "react-hook-form"
import { Button, Input, Label, Spinner, TextField } from "@heroui/react"
import type { AuthParams } from "../../model/types"
import styles from "./AuthForm.module.scss"

interface AuthFormProps {
	onSubmit: (params: AuthParams) => void
	isPending?: boolean
}

export function AuthForm({ onSubmit, isPending }: AuthFormProps) {
	const { register, handleSubmit } = useForm<AuthParams>({
		defaultValues: {
			login: "",
			password: "",
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<h1 className={styles.title}>Авторизация</h1>
			<div className={styles.fields}>
				<TextField isRequired>
					<Label>Email или имя пользователя</Label>
					<Input
						type="text"
						{...register("login", { required: true })}
					/>
				</TextField>
				<TextField isRequired>
					<Label>Пароль</Label>
					<Input
						type="password"
						{...register("password", { required: true })}
					/>
				</TextField>
				<Button
					type="submit"
					variant="primary"
					isDisabled={isPending}
				>
					{isPending && <Spinner size="sm" />}
					Войти
				</Button>
			</div>
		</form>
	)
}
