import { FieldError, Label, TextArea, TextField } from "@heroui/react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

interface TextAreaFieldProps extends ComponentPropsWithoutRef<typeof TextArea> {
	label?: string
	/** Текст ошибки валидации. При наличии поле становится isInvalid и отображает FieldError. */
	error?: ReactNode
}

/**
 * Обёртка над `@heroui TextArea` с лейблом и поддержкой ошибки валидации.
 *
 * Принимает все стандартные пропы HTML `<textarea>` + дополнительные:
 * - `label` — подпись над полем
 * - `error` — текст ошибки (строка, React-элемент); при наличии подсвечивает поле красным
 * - `rows` — количество видимых строк
 *
 * Контролируемое использование (с react-hook-form Controller):
 * ```tsx
 * <Controller
 *   name="description"
 *   control={control}
 *   render={({ field }) => (
 *     <TextAreaField
 *       label="Описание"
 *       rows={4}
 *       error={errors.description?.message}
 *       {...field}
 *     />
 *   )}
 * />
 * ```
 *
 * Неконтролируемое использование (с register):
 * ```tsx
 * <TextAreaField label="Раскрытие темы" rows={2} {...register("target_context")} />
 * ```
 */
export function TextAreaField({ label, error, ...textAreaProps }: TextAreaFieldProps) {
	return (
		<TextField isInvalid={!!error}>
			{label && <Label>{label}</Label>}
			<TextArea {...textAreaProps} />
			{error && <FieldError>{error}</FieldError>}
		</TextField>
	)
}
