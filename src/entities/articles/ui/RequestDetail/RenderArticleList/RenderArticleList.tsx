import { Fragment, type ReactNode } from "react"
import { Stack, Typography } from "@mui/material"
import type { MatchedArticle } from "../../../model/types"

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
		return (
			<Typography variant="body2" color="text.secondary">
				Нет результатов
			</Typography>
		)
	}

	return (
		<Stack spacing={2}>
			{articles.map((article) => (
				<Fragment key={article.id}>{children(article)}</Fragment>
			))}
		</Stack>
	)
}
