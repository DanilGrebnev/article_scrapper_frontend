import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
	Button,
	FieldError,
	Input,
	Label,
	Spinner,
	TextField,
} from "@heroui/react"
import type { RegisterParams, RegisterFormValues } from "../../model/types"
import styles from "./RegisterForm.module.scss"

interface RegisterFormProps {
	onSubmit: (params: RegisterParams) => void
	isPending?: boolean
}

export function RegisterForm({ onSubmit, isPending }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors, dirtyFields },
	} = useForm<RegisterFormValues>({
		mode: "onChange",
		defaultValues: {
			name: "",
			last_name: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const password = watch("password")

	useEffect(() => {
		if (dirtyFields.confirmPassword) {
			trigger("confirmPassword")
		}
	}, [password, trigger, dirtyFields.confirmPassword])

	const submitHandler = ({ confirmPassword: _, ...params }: RegisterFormValues) => {
		onSubmit(params)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)} noValidate>
			<h1 className={styles.title}>Регистрация</h1>
			<div className={styles.fields}>
				<TextField isRequired>
					<Label>Имя</Label>
					<Input {...register("name", { required: true })} />
				</TextField>
				<TextField isRequired>
					<Label>Фамилия</Label>
					<Input {...register("last_name", { required: true })} />
				</TextField>
				<TextField isRequired>
					<Label>Имя пользователя</Label>
					<Input {...register("username", { required: true })} />
				</TextField>
				<TextField isRequired>
					<Label>Email</Label>
					<Input
						type="email"
						{...register("email", { required: true })}
					/>
				</TextField>
				<TextField
					isRequired
					isInvalid={!!errors.password}
				>
					<Label>Пароль</Label>
					<Input
						type="password"
						{...register("password", {
							required: true,
							minLength: 6,
						})}
					/>
					{errors.password?.type === "minLength" && (
						<FieldError>Минимум 6 символов</FieldError>
					)}
				</TextField>
				<TextField
					isRequired
					isInvalid={!!errors.confirmPassword}
				>
					<Label>Подтвердите пароль</Label>
					<Input
						type="password"
						{...register("confirmPassword", {
							required: true,
							validate: (val) =>
								val === watch("password") ||
								"Пароли не совпадают",
						})}
					/>
					{errors.confirmPassword?.message && (
						<FieldError>{errors.confirmPassword.message}</FieldError>
					)}
				</TextField>
				<Button
					type="submit"
					variant="primary"
					isDisabled={isPending}
				>
					{isPending && <Spinner size="sm" />}
					Зарегистрироваться
				</Button>
			</div>
		</form>
	)
}
