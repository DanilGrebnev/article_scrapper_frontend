import { Label, TextArea, TextField } from "@heroui/react"
import type { ComponentPropsWithoutRef } from "react"

interface TextAreaFieldProps extends ComponentPropsWithoutRef<typeof TextArea> {
	label?: string
}

export function TextAreaField({ label, ...textAreaProps }: TextAreaFieldProps) {
	return (
		<TextField>
			{label && <Label>{label}</Label>}
			<TextArea {...textAreaProps} />
		</TextField>
	)
}
