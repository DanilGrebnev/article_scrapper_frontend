import { useState } from "react"
import { Box, Button, Container, Typography, CircularProgress } from "@mui/material"
import { JsonViewer } from "@textea/json-viewer"
import { apiClient } from "@/shared/api/client"

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
		<Container sx={{ py: 4 }}>
			<Typography variant="h5" component="h1" gutterBottom>
				Тест
			</Typography>

			<Button
				variant="contained"
				onClick={handleTest}
				disabled={loading}
				startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
			>
				Тест ИИ
			</Button>

			{error && (
				<Typography color="error" sx={{ mt: 2 }}>
					{error}
				</Typography>
			)}

			{data !== null && (
				<Box sx={{ mt: 3 }}>
					<Typography variant="subtitle2" gutterBottom>
						Результат
					</Typography>
					<JsonViewer
						value={data}
						defaultInspectDepth={3}
						rootName={false}
					/>
				</Box>
			)}
		</Container>
	)
}
