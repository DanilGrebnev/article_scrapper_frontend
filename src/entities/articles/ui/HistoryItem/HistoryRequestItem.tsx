import { Chip } from "@heroui/react"
import type { HistoryListItem } from "../../model/types"
import styles from "./HistoryRequestItem.module.scss"

interface HistoryRequestItemProps {
	item: HistoryListItem
	onPress: () => void
}

export function HistoryItem({ item, onPress }: HistoryRequestItemProps) {
	const { target_theme, field_knowledge, dateFrom, dateTo, amount_articles } =
		item

	return (
		<button type="button" className={styles.card} onClick={onPress}>
			<div className={styles.header}>
				<span className={styles.theme}>{target_theme}</span>
				<span className={styles.field}>{field_knowledge}</span>
			</div>

			<div className={styles.meta}>
				<span className={styles.dates}>
					{dateFrom} — {dateTo}
				</span>

				<div className={styles.counts}>
					<Chip size="sm" variant="primary" color="success">
						{amount_articles.high_match}
					</Chip>
					<Chip size="sm" variant="primary" color="warning">
						{amount_articles.medium_match}
					</Chip>
					<Chip size="sm" variant="primary" color="danger">
						{amount_articles.low_match}
					</Chip>
				</div>
			</div>
		</button>
	)
}

