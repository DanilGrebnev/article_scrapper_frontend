import { useNavigate } from "react-router-dom"
import { Alert, Button } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import { RequestDetail, useArticleSearchResult } from "@/entities/articles"
import type { SearchResponse } from "@/entities/articles/model/types"
import styles from "./SearchDetailPage.module.scss"

export function SearchDetailPage() {
	const navigate = useNavigate()
	const data = useArticleSearchResult() as SearchResponse | null

	return (
		<div className={styles.page}>
			<Button
				size="sm"
				variant="ghost"
				onPress={() => navigate("/")}
			>
				<ArrowLeft size={16} />
				Назад к поиску
			</Button>

			<h1 className={styles.title}>Детализация поиска</h1>

			{!data && (
				<Alert color="primary">
					Нет данных. Сначала выполните поиск на главной странице.
				</Alert>
			)}

			{data && (
				<RequestDetail response={data} />
			)}
		</div>
	)
}
