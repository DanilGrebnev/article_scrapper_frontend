import { Chip } from "@heroui/react"
import styles from "./MatchSectionHeader.module.scss"

interface MatchSectionHeaderProps {
	label: string
	color: string
	bg: string
	count: number
}

/**
 * Заголовок секции совпадений: разделитель, подпись и чип с количеством статей.
 */
export function MatchSectionHeader({ label, color, bg, count }: MatchSectionHeaderProps) {
	return (
		<>
			<hr className={styles.divider} />
			<div className={styles.row}>
				<span className={styles.label} style={{ color }}>
					{label}
				</span>
				<Chip
					size="sm"
					style={{ backgroundColor: bg, color, fontWeight: 700 }}
				>
					{count}
				</Chip>
			</div>
		</>
	)
}
