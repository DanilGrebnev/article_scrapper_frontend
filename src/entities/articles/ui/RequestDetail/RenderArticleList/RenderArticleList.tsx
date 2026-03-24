import { type ReactNode } from "react"
import type { MatchedArticle } from "../../../model/types"
import styles from "./RenderArticleList.module.scss"

interface RenderArticleListProps {
	articles: MatchedArticle[]
	children: (article: MatchedArticle) => ReactNode
}

export function RenderArticleList({ articles, children }: RenderArticleListProps) {
	if (articles.length === 0) {
		return <p className={styles.empty}>Нет результатов</p>
	}

	return (
		<div className={styles.list}>
			{articles.map((article) => (
				<div key={article.id} className={styles.item}>
					{children(article)}
				</div>
			))}
		</div>
	)
}
