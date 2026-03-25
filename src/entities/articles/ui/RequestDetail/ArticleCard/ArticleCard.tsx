import { Card, Link } from "@heroui/react"
import type { TArticle } from "../../../model/types"
import { ArticleExplanation } from "./ArticleExplanation/ArticleExplanation"
import { ComparisonRulesTable } from "./ComparisonRulesTable/ComparisonRulesTable"
import styles from "./ArticleCard.module.scss"

interface ArticleCardProps {
	article: TArticle
}

/**
 * Карточка статьи: ID, переведённый заголовок и абстракт,
 * пояснение и раскрываемая таблица правил сравнения.
 */
export function ArticleCard({ article }: ArticleCardProps) {
	
	const original = article.original

	return (
		<Card>
			<div style={{ padding: 16 }}>
				<p className={styles.id}>ID: {article.id}</p>
				<p className={styles.title}>{article.t_title}</p>
				<p className={styles.abstract}>{article.t_abstract}</p>

				{original && (
					<p className={styles.authors}>{original.authors}</p>
				)}

				{original.link && (
					<Link
						href={original.link}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.link}
					>
						Оригинал статьи
						<Link.Icon />
					</Link>
				)}


				{article.explanation && (
					<ArticleExplanation explanation={article.explanation} />
				)}

				{article.comparison_of_rules?.length > 0 && (
					<ComparisonRulesTable rules={article.comparison_of_rules} />
				)}
			</div>
		</Card>
	)
}
