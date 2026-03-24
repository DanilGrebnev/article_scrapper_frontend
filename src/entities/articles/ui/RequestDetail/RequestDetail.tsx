import { Box, Stack } from "@mui/material"
import { ArticleCard } from "./ArticleCard/ArticleCard"
import { MatchSectionHeader } from "./MatchSectionHeader/MatchSectionHeader"
import { RenderArticleList } from "./RenderArticleList/RenderArticleList"
import { SearchParamsDisplay } from "./SearchParamsDisplay/SearchParamsDisplay"
import type { SearchParams, SearchResponse } from "../../model/types"

const MATCH_SECTIONS = [
	{
		key: "high_match" as const,
		label: "Высокое совпадение",
		color: "#2e7d32",
		bg: "#e8f5e9",
	},
	{
		key: "medium_match" as const,
		label: "Среднее совпадение",
		color: "#ed6c02",
		bg: "#fff3e0",
	},
	{
		key: "low_match" as const,
		label: "Низкое совпадение",
		color: "#d32f2f",
		bg: "#fbe9e7",
	},
]

interface RequestDetailProps {
	response: SearchResponse
	variables?: SearchParams
}

/**
 * Отвечает за показ детализации запроса.
 * Рендерит параметры запроса, три блока по степени совпадения
 * (высокое, среднее, низкое) и карточки статей в каждом блоке.
 * В будущем будет рендериться на отдельной странице при нажатии на item запроса.
 */
export function RequestDetail({ response, variables }: RequestDetailProps) {
	return (
		<>
			{variables && <SearchParamsDisplay data={variables} />}
			<Stack spacing={3}>
				{MATCH_SECTIONS.map(({ key, label, color, bg }) => {
					const articles = response[key] ?? []

					return (
						<Box key={key}>
							<MatchSectionHeader
								label={label}
								color={color}
								bg={bg}
								count={articles.length}
							/>

							<RenderArticleList articles={articles}>
								{(article) => <ArticleCard article={article} />}
							</RenderArticleList>
						</Box>
					)
				})}
			</Stack>
		</>
	)
}
