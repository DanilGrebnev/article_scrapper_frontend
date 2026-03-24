import { useForm, Controller } from "react-hook-form"
import { Button, Spinner } from "@heroui/react"
import { InputField } from "@/shared/ui/InputField"
import type { AuthParams } from "../../model/types"
import styles from "./AuthForm.module.scss"

interface AuthFormProps {
	onSubmit: (params: AuthParams) => void
	isPending?: boolean
}

export function AuthForm({ onSubmit, isPending }: AuthFormProps) {
	const { control, handleSubmit } = useForm<AuthParams>({
		// TODO: убрать мок-данные
		defaultValues: {
			login: "danil_grebnev",
			password: "htczte2101",
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<h1 className={styles.title}>Авторизация</h1>
			<div className={styles.fields}>
				<Controller
					name="login"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField
							label="Email или имя пользователя"
							type="text"
							{...field}
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField label="Пароль" type="password" {...field} />
					)}
				/>
				<Button
					type="submit"
					variant="primary"
					isDisabled={isPending}
					className={styles.submitButton}
				>
					{isPending && <Spinner size="sm" />}
					Войти
				</Button>
			</div>
		</form>
	)
}
