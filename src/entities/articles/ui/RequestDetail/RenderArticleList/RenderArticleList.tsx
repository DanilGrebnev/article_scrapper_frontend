import { Fragment, type ReactNode } from "react"
import type { MatchedArticle } from "../../../model/types"
import styles from "./RenderArticleList.module.scss"

interface RenderArticleListProps {
	articles: MatchedArticle[]
	children: (article: MatchedArticle) => ReactNode
}

/**
 * Рендерит список статей через children callback.
 * Если список пустой — показывает «Нет результатов».
 */
export function RenderArticleList({ articles, children }: RenderArticleListProps) {
	if (articles.length === 0) {
		return <p className={styles.empty}>Нет результатов</p>
	}

	return (
		<div className={styles.list}>
			{articles.map((article) => (
				<Fragment key={article.id}>{children(article)}</Fragment>
			))}
		</div>
	)
}
