import { useNavigate, useSearchParams } from "react-router-dom"
import { Alert, Button } from "@heroui/react"
import { ArrowLeft } from "lucide-react"
import {
	RequestDetail,
	RequestDetailSkeleton,
	useArticleSearchResult,
	useHistoryDetail,
} from "@/entities/articles"
import styles from "./SearchDetailPage.module.scss"

export function SearchDetailPage() {
	const navigate = useNavigate()
	const [params] = useSearchParams()

	const historyId = params.get("id")
	const isFromHistory = historyId != null

	const {
		data: historyData,
		isLoading: historyLoading,
		error: historyError,
	} = useHistoryDetail(isFromHistory ? Number(historyId) : null)

	const cacheData = useArticleSearchResult()

	const data = isFromHistory ? historyData : cacheData

	return (
		<div className={styles.page}>
			<Button
				size="sm"
				variant="ghost"
				onPress={() => navigate(isFromHistory ? "/history" : "/")}
			>
				<ArrowLeft size={16} />
				{isFromHistory ? "К истории" : "Назад к поиску"}
			</Button>

			<h1 className={styles.title}>Детализация поиска</h1>

			{isFromHistory && historyLoading && <RequestDetailSkeleton />}

			{isFromHistory && historyError && (
				<Alert color="danger">
					{historyError instanceof Error
						? historyError.message
						: "Ошибка загрузки деталей запроса"}
				</Alert>
			)}

			{!data && !historyLoading && !historyError && (
				<Alert color="primary">
					Нет данных. Сначала выполните поиск на главной странице.
				</Alert>
			)}

			{data && <RequestDetail response={data} />}
		</div>
	)
}
