import { useState } from "react"
import { Button, Spinner } from "@heroui/react"
import { JsonPreview } from "@/shared/ui/JsonPreview"
import { apiClient } from "@/shared/api/client"
import styles from "./AiTestPage.module.scss"

export function AiTestPage() {
	const [data, setData] = useState<unknown>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleTest = async () => {
		setLoading(true)
		setError(null)
		setData(null)
		try {
			const result = await apiClient.get("ai-test").json()
			setData(result)
		} catch (err) {
			setError(err instanceof Error ? err.message : "Неизвестная ошибка")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Тест</h1>

			<Button
				variant="primary"
				onPress={handleTest}
				isDisabled={loading}
			>
				{loading && <Spinner size="sm" />}
				Тест ИИ
			</Button>

			{error && <p className={styles.error}>{error}</p>}

			{data !== null && (
				<div className={styles.resultBlock}>
					<p className={styles.resultTitle}>Результат</p>
					<JsonPreview data={data} />
				</div>
			)}
		</div>
	)
}
