import { Chip } from "@heroui/react"
import type { SearchParams } from "../../../model/types"
import styles from "./SearchParamsDisplay.module.scss"

interface SearchParamsDisplayProps {
	data: SearchParams
}

/**
 * Отображает параметры поискового запроса в виде чипов (ключ: значение).
 */
export function SearchParamsDisplay({ data }: SearchParamsDisplayProps) {
	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Параметры запроса</p>
			<div className={styles.chips}>
				{Object.entries(data).map(([key, value]) => {
					if (
						value === undefined ||
						value === "" ||
						(typeof value === "number" && isNaN(value))
					)
						return null
					return (
						<Chip key={key} size="sm" variant="bordered">
							{key}: {String(value)}
						</Chip>
					)
				})}
			</div>
		</div>
	)
}
