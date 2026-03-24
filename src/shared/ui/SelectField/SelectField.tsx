import { Label, ListBox, Select } from "@heroui/react"

export interface SelectOption {
	value: string
	label: string
}

interface SelectFieldProps {
	label: string
	options: SelectOption[]
	value?: string
	onChange?: (value: string) => void
	onBlur?: () => void
}

export function SelectField({ label, options, value, onChange, onBlur }: SelectFieldProps) {
	return (
		<Select
			value={value}
			onChange={(val) => {
				if (val && onChange) onChange(String(val))
			}}
			onBlur={onBlur}
		>
			<Label>{label}</Label>
			<Select.Trigger>
				<Select.Value />
				<Select.Indicator />
			</Select.Trigger>
			<Select.Popover>
				<ListBox>
					{options.map(({ value: optValue, label: optLabel }) => (
						<ListBox.Item key={optValue} id={optValue}>
							{optLabel}
						</ListBox.Item>
					))}
				</ListBox>
			</Select.Popover>
		</Select>
	)
}
