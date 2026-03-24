import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button, Spinner } from "@heroui/react"
import { InputField } from "@/shared/ui/InputField"
import type { RegisterParams, RegisterFormValues } from "../../model/types"
import styles from "./RegisterForm.module.scss"

interface RegisterFormProps {
	onSubmit: (params: RegisterParams) => void
	isPending?: boolean
}

export function RegisterForm({ onSubmit, isPending }: RegisterFormProps) {
	const {
		control,
		handleSubmit,
		watch,
		trigger,
		formState: { errors, dirtyFields },
	} = useForm<RegisterFormValues>({
		mode: "onChange",
		// TODO: убрать мок-данные
		defaultValues: {
			name: "Данил",
			last_name: "Гребнев",
			username: "danil_grebnev",
			email: "grebnevdanil60@gmail.com",
			password: "htczte2101",
			confirmPassword: "htczte2101",
		},
	})

	const password = watch("password")

	useEffect(() => {
		if (dirtyFields.confirmPassword) {
			trigger("confirmPassword")
		}
	}, [password, trigger, dirtyFields.confirmPassword])

	const submitHandler = ({
		confirmPassword: _,
		...params
	}: RegisterFormValues) => {
		onSubmit(params)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)} noValidate>
			<h1 className={styles.title}>Регистрация</h1>
			<div className={styles.fields}>
				<Controller
					name="name"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField label="Имя" {...field} />
					)}
				/>
				<Controller
					name="last_name"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField label="Фамилия" {...field} />
					)}
				/>
				<Controller
					name="username"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField label="Имя пользователя" {...field} />
					)}
				/>
				<Controller
					name="email"
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<InputField label="Email" type="email" {...field} />
					)}
				/>
				<Controller
					name="password"
					control={control}
					rules={{ required: true, minLength: 6 }}
					render={({ field }) => (
						<InputField
							label="Пароль"
							type="password"
							error={
								errors.password?.type === "minLength"
									? "Минимум 6 символов"
									: undefined
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name="confirmPassword"
					control={control}
					rules={{
						required: true,
						validate: (val) =>
							val === watch("password") || "Пароли не совпадают",
					}}
					render={({ field }) => (
						<InputField
							label="Подтвердите пароль"
							type="password"
							error={errors.confirmPassword?.message}
							{...field}
						/>
					)}
				/>
				<Button
					type="submit"
					variant="primary"
					isDisabled={isPending}
					className={styles.submitButton}
				>
					{isPending && <Spinner size="sm" />}
					Зарегистрироваться
				</Button>
			</div>
		</form>
	)
}
