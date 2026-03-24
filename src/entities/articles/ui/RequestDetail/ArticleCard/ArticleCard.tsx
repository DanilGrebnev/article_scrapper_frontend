import { Card, CardContent, Link, Typography } from "@mui/material"
import type { MatchedArticle } from "../../../model/types"
import { ArticleExplanation } from "./ArticleExplanation/ArticleExplanation"
import { ComparisonRulesTable } from "./ComparisonRulesTable/ComparisonRulesTable"

interface ArticleCardProps {
	article: MatchedArticle
}

/**
 * Карточка статьи: ID, переведённый заголовок и абстракт,
 * пояснение и раскрываемая таблица правил сравнения.
 */
export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Card variant="outlined">
			<CardContent sx={{ pb: 1 }}>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 0.5 }}
				>
					ID: {article.id}
				</Typography>
				<Typography variant="subtitle1" fontWeight={600}>
					{article.t_title}
				</Typography>
				<Typography
					variant="body2"
					sx={{ mt: 1, whiteSpace: "pre-wrap" }}
				>
					{article.t_abstract}
				</Typography>
				{article.authors && (
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ mt: 1 }}
					>
						{article.authors}
					</Typography>
				)}
				{article.link && (
					<Link
						href={article.link}
						target="_blank"
						rel="noopener noreferrer"
						variant="body2"
						sx={{ mt: 1, display: "inline-block" }}
					>
						Оригинал статьи
					</Link>
				)}

				{article.explanation && (
					<ArticleExplanation explanation={article.explanation} />
				)}

				{article.comparison_of_rules?.length > 0 && (
					<ComparisonRulesTable rules={article.comparison_of_rules} />
				)}
			</CardContent>
		</Card>
	)
}
