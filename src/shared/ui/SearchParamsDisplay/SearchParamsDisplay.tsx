import { Chip } from "@heroui/react"
import styles from "./SearchParamsDisplay.module.scss"

interface SearchParamsDisplayProps {
	data: object
	labels?: Partial<Record<string, string>>
	fieldOrder?: string[]
}

function formatValue(value: unknown): string {
	if (typeof value === "boolean") return value ? "Да" : "Нет"
	return String(value)
}

function isBlank(value: unknown): boolean {
	return (
		value === undefined ||
		value === null ||
		value === "" ||
		(typeof value === "number" && isNaN(value))
	)
}

/**
 * Отображает параметры поискового запроса в виде чипов (лейбл: значение).
 * Для длинных текстовых значений (например `target_context`) переносит текст,
 * не растягивая контейнер.
 */
export function SearchParamsDisplay({
	data,
	labels,
	fieldOrder,
}: SearchParamsDisplayProps) {
	const entries = data as Record<string, unknown>
	const keys = fieldOrder
		? fieldOrder.filter((k) => k in entries)
		: Object.keys(entries)

	const shortItems: { key: string; label: string; formatted: string }[] = []
	const longItems: { key: string; label: string; formatted: string }[] = []

	for (const key of keys) {
		const value = entries[key]
		if (isBlank(value)) continue
		const label = labels?.[key] ?? key
		const formatted = formatValue(value)
		const isLong = typeof value === "string" && value.length > 60
		;(isLong ? longItems : shortItems).push({ key, label, formatted })
	}

	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Параметры запроса</p>
			<div className={styles.chips}>
				{shortItems.map(({ key, label, formatted }) => (
					<Chip key={key} size="sm" variant="bordered">
						{label}: {formatted}
					</Chip>
				))}
			</div>
			{longItems.map(({ key, label, formatted }) => (
				<div key={key} className={styles.longParam}>
					<span className={styles.longLabel}>{label}:</span>
					<span className={styles.longValue}>{formatted}</span>
				</div>
			))}
		</div>
	)
}
