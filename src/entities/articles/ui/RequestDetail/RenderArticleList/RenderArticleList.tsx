import { type ReactNode } from "react"
import { Virtuoso } from "react-virtuoso"
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
		<Virtuoso
			data={articles}
			useWindowScroll
			itemContent={(_, article) => (
				<div className={styles.item}>{children(article)}</div>
			)}
			increaseViewportBy={400}
		/>
	)
}
