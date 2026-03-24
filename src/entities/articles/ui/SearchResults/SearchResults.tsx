import { useNavigate } from "react-router-dom"
import { Button } from "@heroui/react"
import { JsonPreview } from "@/shared/ui/JsonPreview"
import { useArticleSearchResult } from "@/entities/articles/api/articles"
import styles from "./SearchResults.module.scss"

export function SearchResults() {
	const navigate = useNavigate()
	const data = useArticleSearchResult()

	if (!data) {
		return (
			<p className={styles.empty}>
				Заполните форму и нажмите «Поиск»
			</p>
		)
	}

	return (
		<div>
			<div className={styles.toolbar}>
				<Button
					size="sm"
					variant="outline"
					onPress={() => navigate("/search-detail")}
				>
					Подробнее
				</Button>
			</div>
			<JsonPreview data={data} />
		</div>
	)
}
