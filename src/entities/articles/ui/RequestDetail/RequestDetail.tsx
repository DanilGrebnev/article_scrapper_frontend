import { MatchSectionHeader } from "./MatchSectionHeader/MatchSectionHeader"
import { RenderArticleList } from "./RenderArticleList/RenderArticleList"
import { SearchParamsDisplay } from "@/shared/ui/SearchParamsDisplay"
import { ArticleFilterInput } from "./ArticleFilterInput/ArticleFilterInput"
import { useArticleFilter } from "../../model/hooks/useArticleFilter"
import { SEARCH_PARAM_LABELS, SEARCH_PARAM_ORDER } from "../../lib/searchParamLabels"
import type { TArticleHistoryDetail } from "../../model/types"
import styles from "./RequestDetail.module.scss"

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
	response: TArticleHistoryDetail
}

/**
 * Отвечает за показ детализации запроса.
 * Рендерит параметры запроса (из response.filters), три блока по степени совпадения
 * (высокое, среднее, низкое) и карточки статей в каждом блоке.
 */
export function RequestDetail({ response }: RequestDetailProps) {
	const { query, setQuery, filtered } = useArticleFilter(response)

	return (
		<div className={styles.wrapper}>
			{response.filters && (
				<SearchParamsDisplay
					data={response.filters}
					labels={SEARCH_PARAM_LABELS}
					fieldOrder={SEARCH_PARAM_ORDER}
				/>
			)}
			
			<ArticleFilterInput value={query} onChange={setQuery} />

			<div className={styles.sections}>
				{MATCH_SECTIONS.map(({ key, label, color, bg }) => {
					const articles = filtered[key] ?? []

					return (
						<div key={key}>
							<MatchSectionHeader
								label={label}
								color={color}
								bg={bg}
								count={articles.length}
							/>

							<RenderArticleList articles={articles} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
