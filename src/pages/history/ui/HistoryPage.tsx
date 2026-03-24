import styles from "./HistoryPage.module.scss"

export function HistoryPage() {
	return (
		<div className={styles.page}>
			<h1 className={styles.title}>История поиска</h1>
			<p className={styles.subtitle}>
				Здесь будет отображаться история поисковых запросов
			</p>
		</div>
	)
}
