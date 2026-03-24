import { useNavigate } from "react-router-dom"
import { Alert, Button } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import { RequestDetail } from "@/entities/articles"
import { SearchStatusAlert } from "@/shared/ui/SearchStatusAlert"
import { useGetArticlesAfterSearch } from "@/entities/articles/api/articles"
import type { SearchResponse } from "@/entities/articles/model/types"
import styles from "./SearchDetailPage.module.scss"

export function SearchDetailPage() {
	const navigate = useNavigate()
	const { data, error, status, hasResult, variables } =
		useGetArticlesAfterSearch()
	const response = data as SearchResponse | undefined

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

			{!hasResult && (
				<Alert color="primary">
					Нет данных. Сначала выполните поиск на главной странице.
				</Alert>
			)}

			<SearchStatusAlert status={status} error={error} />

			{response && (
				<RequestDetail response={response} variables={variables} />
			)}
		</div>
	)
}
