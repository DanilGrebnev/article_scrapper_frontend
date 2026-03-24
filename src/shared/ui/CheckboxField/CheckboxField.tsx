import { Checkbox, Label } from "@heroui/react"

interface CheckboxFieldProps {
	label: string
	isSelected?: boolean
	onChange?: (isSelected: boolean) => void
	onBlur?: () => void
	isDisabled?: boolean
}

export function CheckboxField({
	label,
	isSelected = false,
	onChange,
	onBlur,
	isDisabled,
}: CheckboxFieldProps) {
	return (
		<Checkbox
			isSelected={isSelected}
			onChange={onChange}
			onBlur={onBlur}
			isDisabled={isDisabled}
		>
			<Checkbox.Control>
				<Checkbox.Indicator />
			</Checkbox.Control>
			<Checkbox.Content>
				<Label>{label}</Label>
			</Checkbox.Content>
		</Checkbox>
	)
}
