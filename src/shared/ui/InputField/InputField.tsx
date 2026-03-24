import { FieldError, Input, Label, TextField } from "@heroui/react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

interface InputFieldProps extends ComponentPropsWithoutRef<typeof Input> {
	label?: string
	/** Текст ошибки валидации. При наличии поле становится isInvalid и отображает FieldError. */
	error?: ReactNode
}

/**
 * Обёртка над `@heroui Input` с лейблом и поддержкой ошибки валидации.
 *
 * Принимает все стандартные пропы HTML `<input>` + дополнительные:
 * - `label` — подпись над полем
 * - `error` — текст ошибки (строка, React-элемент); при наличии подсвечивает поле красным
 *
 * Контролируемое использование (с react-hook-form Controller):
 * ```tsx
 * <Controller
 *   name="email"
 *   control={control}
 *   rules={{ required: true }}
 *   render={({ field }) => (
 *     <InputField
 *       label="Email"
 *       type="email"
 *       error={errors.email?.message}
 *       {...field}
 *     />
 *   )}
 * />
 * ```
 *
 * Неконтролируемое использование (с register):
 * ```tsx
 * <InputField label="Тема" {...register("theme")} />
 * ```
 */
export function InputField({ label, error, ...inputProps }: InputFieldProps) {
	return (
		<TextField isInvalid={!!error}>
			{label && <Label>{label}</Label>}
			<Input {...inputProps} />
			{error && <FieldError>{error}</FieldError>}
		</TextField>
	)
}
