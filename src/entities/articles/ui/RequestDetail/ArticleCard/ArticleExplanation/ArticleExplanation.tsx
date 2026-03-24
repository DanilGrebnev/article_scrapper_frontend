import styles from "./ArticleExplanation.module.scss"

interface ArticleExplanationProps {
	explanation: string
}

/**
 * Отображает пояснение к статье (почему она попала в результаты поиска).
 */
export function ArticleExplanation({ explanation }: ArticleExplanationProps) {
	return (
		<div className={styles.wrapper}>
			<p className={styles.label}>Объяснение</p>
			<p className={styles.text}>{explanation}</p>
		</div>
	)
}
