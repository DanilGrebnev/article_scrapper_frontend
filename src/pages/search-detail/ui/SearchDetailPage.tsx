import { useCallback, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Alert, Button } from "@heroui/react"
import { ArrowLeft, Download } from "lucide-react"
import {
	RequestDetail,
	RequestDetailSkeleton,
	useArticleSearchResult,
	useHistoryDetail,
} from "@/entities/articles"
import { apiClientSecure } from "@/shared/api/client-secure"
import styles from "./SearchDetailPage.module.scss"

export function SearchDetailPage() {
	const navigate = useNavigate()
	const [params] = useSearchParams()

	const historyId = params.get("id")
	const isFromHistory = historyId != null

	const [isDownloading, setIsDownloading] = useState(false)
	const [downloadError, setDownloadError] = useState<string | null>(null)

	const {
		data: historyData,
		isLoading: historyLoading,
		error: historyError,
	} = useHistoryDetail(isFromHistory ? Number(historyId) : null)

	const cacheData = useArticleSearchResult()

	const data = isFromHistory ? historyData : cacheData

	const handleDownload = useCallback(async () => {
		if (!historyId) return

		setDownloadError(null)
		setIsDownloading(true)

		try {
			const blob = await apiClientSecure
				.get("pdf", { searchParams: { id: historyId } })
				.blob()

			if (!blob || blob.size === 0) {
				throw new Error("Файл не найден или пуст")
			}

			const blobUrl = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = blobUrl
			link.download = `request-${historyId}.pdf`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			URL.revokeObjectURL(blobUrl)
		} catch (error) {
			console.error(error)
			const message =
				error instanceof Error && error.message
					? error.message
					: "Не удалось скачать PDF"
			setDownloadError(message)
		} finally {
			setIsDownloading(false)
		}
	}, [historyId])

	const heroSubtitle = isFromHistory
		? "Скачайте PDF-отчёт или изучите результаты ниже."
		: "Актуальные результаты последнего поиска."

	return (
		<div className={styles.page}>
			<div className={styles.toolbar}>
				<Button
					size="sm"
					variant="ghost"
					className={styles.backButton}
					onPress={() => navigate(isFromHistory ? "/history" : "/")}
				>
					<ArrowLeft size={16} />
					{isFromHistory ? "К истории" : "Назад к поиску"}
				</Button>

				{isFromHistory && (
					<Button
							size="sm"
							variant="primary"
							className={styles.downloadButton}
							onPress={handleDownload}
							isDisabled={isDownloading}
						>
							{isDownloading ? (
								<span className={styles.downloadContent}>
									<span className={styles.spinner} />
									Скачивание…
								</span>
							) : (
								<span className={styles.downloadContent}>
									<Download size={16} />
									Скачать PDF
								</span>
							)}
						</Button>
					)}
			</div>

			<div className={styles.hero}>
				<div>
					<h1 className={styles.title}>Детализация поиска</h1>
					<p className={styles.subtitle}>{heroSubtitle}</p>
				</div>
			</div>

			{downloadError && (
				<Alert color="danger" className={styles.alert}>
					{downloadError}
				</Alert>
			)}

			{isFromHistory && historyLoading && <RequestDetailSkeleton />}

			{isFromHistory && historyError && (
				<Alert color="danger" className={styles.alert}>
					{historyError instanceof Error
						? historyError.message
						: "Ошибка загрузки деталей запроса"}
				</Alert>
			)}

			{!data && !historyLoading && !historyError && (
				<Alert color="primary" className={styles.alert}>
					Нет данных. Сначала выполните поиск на главной странице.
				</Alert>
			)}

			{data && <RequestDetail response={data} />}
		</div>
	)
}
