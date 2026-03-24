import { Input, Label, TextField } from "@heroui/react"
import type { ComponentPropsWithoutRef } from "react"

interface InputFieldProps extends ComponentPropsWithoutRef<typeof Input> {
	label?: string
}

export function InputField({ label, ...inputProps }: InputFieldProps) {
	return (
		<TextField>
			{label && <Label>{label}</Label>}
			<Input {...inputProps} />
		</TextField>
	)
}
