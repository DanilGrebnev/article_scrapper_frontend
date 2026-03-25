import styles from "./HistoryRequestItemSkeleton.module.scss"

export function HistoryRequestItemSkeleton() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.theme} />
				<span className={styles.field} />
			</div>
			<div className={styles.meta}>
				<span className={styles.dates} />
				<div className={styles.counts}>
					<span className={styles.chip} />
					<span className={styles.chip} />
					<span className={styles.chip} />
				</div>
			</div>
		</div>
	)
}
