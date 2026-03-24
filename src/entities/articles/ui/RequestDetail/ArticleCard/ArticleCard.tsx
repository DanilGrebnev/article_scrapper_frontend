import { Card, Link } from "@heroui/react"
import type { MatchedArticle } from "../../../model/types"
import { ArticleExplanation } from "./ArticleExplanation/ArticleExplanation"
import { ComparisonRulesTable } from "./ComparisonRulesTable/ComparisonRulesTable"
import styles from "./ArticleCard.module.scss"

interface ArticleCardProps {
	article: MatchedArticle
}

/**
 * Карточка статьи: ID, переведённый заголовок и абстракт,
 * пояснение и раскрываемая таблица правил сравнения.
 */
export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card>
			<div style={{ padding: 16 }}>
				<p className={styles.id}>ID: {article.id}</p>
				<p className={styles.title}>{article.t_title}</p>
				<p className={styles.abstract}>{article.t_abstract}</p>

				{article.authors && (
					<p className={styles.authors}>{article.authors}</p>
				)}

				{article.link && (
					<Link
						href={article.link}
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
