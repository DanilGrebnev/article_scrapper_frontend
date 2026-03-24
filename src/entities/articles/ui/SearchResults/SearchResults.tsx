import { Link } from "react-router-dom"
import { Alert, Button } from "@heroui/react"
import { JsonPreview } from "@/shared/ui/JsonPreview"
import { useGetArticlesAfterSearch } from "@/entities/articles/api/articles"
import styles from "./SearchResults.module.scss"

export function SearchResults() {
	const { data, error, status, hasResult } = useGetArticlesAfterSearch()

	return (
		<div>
			{status === "error" && error && (
				<Alert color="danger">{error.message}</Alert>
			)}

			{!hasResult && (
				<p className={styles.empty}>
					Заполните форму и нажмите «Поиск»
				</p>
			)}

			{data !== undefined && (
				<div>
					<div className={styles.toolbar}>
						<Link to="/search-detail">
							<Button size="sm" variant="outline">
								Подробнее
							</Button>
						</Link>
					</div>
					<JsonPreview data={data} />
				</div>
			)}
		</div>
	)
}
