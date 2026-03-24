import { Input, Label, TextField } from "@heroui/react"
import type { UseFormRegister } from "react-hook-form"
import type { SearchParams } from "@/entities/articles/model/types"
import styles from "./DateRangeFields.module.scss"

interface DateRangeFieldsProps {
	register: UseFormRegister<SearchParams>
}

function clampYear(value: string): string {
	if (value.length > 4) return value.slice(0, 4)
	return value
}

export function DateRangeFields({ register }: DateRangeFieldsProps) {
	const { onChange: onChangeFrom, ...restFrom } = register("dateFrom", {
		valueAsNumber: true,
	})
	const { onChange: onChangeTo, ...restTo } = register("dateTo", {
		valueAsNumber: true,
	})

	return (
		<div className={styles.row}>
			<TextField>
				<Label>Date From</Label>
				<Input
					type="number"
					placeholder="2024"
					min={1000}
					max={9999}
					onKeyDown={(e) => {
						const input = e.currentTarget
						if (
							input.value.length >= 4 &&
							!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
						) {
							e.preventDefault()
						}
					}}
					onChange={(e) => {
						e.target.value = clampYear(e.target.value)
						onChangeFrom(e)
					}}
					{...restFrom}
				/>
			</TextField>
			<TextField>
				<Label>Date To</Label>
				<Input
					type="number"
					placeholder="2025"
					min={1000}
					max={9999}
					onKeyDown={(e) => {
						const input = e.currentTarget
						if (
							input.value.length >= 4 &&
							!["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
						) {
							e.preventDefault()
						}
					}}
					onChange={(e) => {
						e.target.value = clampYear(e.target.value)
						onChangeTo(e)
					}}
					{...restTo}
				/>
			</TextField>
		</div>
	)
}
