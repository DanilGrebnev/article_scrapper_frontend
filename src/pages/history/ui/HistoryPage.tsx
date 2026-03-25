import { useNavigate } from "react-router-dom"
import {
	HistoryItem,
	HistoryRequestItemSkeleton,
	useHistoryList,
} from "@/entities/articles"
import styles from "./HistoryPage.module.scss"

const SKELETON_COUNT = 5

export function HistoryPage() {
	const navigate = useNavigate()
	const { data, isLoading, error } = useHistoryList()

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>История поиска</h1>

			{isLoading && (
				<div className={styles.list}>
					{Array.from({ length: SKELETON_COUNT }, (_, i) => (
						<HistoryRequestItemSkeleton key={i} />
					))}
				</div>
			)}

			{error && (
				<p className={styles.error}>
					{error instanceof Error
						? error.message
						: "Ошибка загрузки истории"}
				</p>
			)}

			{data && data.length === 0 && (
				<p className={styles.subtitle}>Нет запросов</p>
			)}

			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((item) => (
						<HistoryItem
							key={item.id}
							item={item}
							onPress={() =>
								navigate(`/search-detail?id=${item.id}`)
							}
						/>
					))}
				</div>
			)}
		</div>
	)
}
