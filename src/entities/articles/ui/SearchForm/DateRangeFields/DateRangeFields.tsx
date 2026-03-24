import { Input, Label, TextField } from "@heroui/react"
import { useController, type Control, type UseFormGetValues, type UseFormTrigger } from "react-hook-form"
import type { SearchParams } from "@/entities/articles/model/types"
import { SEARCH_PARAM_LABELS } from "../../../lib/searchParamLabels"
import styles from "./DateRangeFields.module.scss"

interface DateRangeFieldsProps {
	control: Control<SearchParams>
	trigger: UseFormTrigger<SearchParams>
	getValues: UseFormGetValues<SearchParams>
}

function clampYear(value: string): string {
	if (value.length > 4) return value.slice(0, 4)
	return value
}

function blockExcessInput(e: React.KeyboardEvent<HTMLInputElement>) {
	const blocked = !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
	if (e.currentTarget.value.length >= 4 && blocked) {
		e.preventDefault()
	}
}

export function DateRangeFields({ control, trigger, getValues }: DateRangeFieldsProps) {
	const { field: fromField, fieldState: fromState } = useController({
		control,
		name: "dateFrom",
		rules: {
			min: { value: 1000, message: "Введите корректный год" },
			max: { value: 9999, message: "Введите корректный год" },
			validate: (value) => {
				const from = Number(value)
				const to = Number(getValues("dateTo"))
				if (from > to) return "Начальный год не может быть больше конечного"
				return true
			},
		},
	})

	const { field: toField, fieldState: toState } = useController({
		control,
		name: "dateTo",
		rules: {
			min: { value: 1000, message: "Введите корректный год" },
			max: { value: 9999, message: "Введите корректный год" },
			validate: (value) => {
				const from = Number(getValues("dateFrom"))
				const to = Number(value)
				if (to < from) return "Конечный год не может быть меньше начального"
				if (to - from > 1) return "Диапазон не может превышать 1 год"
				return true
			},
		},
	})

	const error = fromState.error?.message || toState.error?.message

	return (
		<div className={styles.wrapper}>
			<div className={styles.row}>
				<TextField isInvalid={!!fromState.error}>
					<Label>{SEARCH_PARAM_LABELS.dateFrom}</Label>
					<Input
						type="number"
						placeholder="2024"
						value={fromField.value ?? ""}
						onKeyDown={blockExcessInput}
						onChange={(e) => {
							e.target.value = clampYear(e.target.value)
							fromField.onChange(
								e.target.value === "" ? undefined : Number(e.target.value),
							)
							trigger("dateTo")
						}}
						onBlur={fromField.onBlur}
						name={fromField.name}
						ref={fromField.ref}
					/>
				</TextField>
				<TextField isInvalid={!!toState.error}>
					<Label>{SEARCH_PARAM_LABELS.dateTo}</Label>
					<Input
						type="number"
						placeholder="2025"
						value={toField.value ?? ""}
						onKeyDown={blockExcessInput}
						onChange={(e) => {
							e.target.value = clampYear(e.target.value)
							toField.onChange(
								e.target.value === "" ? undefined : Number(e.target.value),
							)
							trigger("dateFrom")
						}}
						onBlur={toField.onBlur}
						name={toField.name}
						ref={toField.ref}
					/>
				</TextField>
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	)
}
