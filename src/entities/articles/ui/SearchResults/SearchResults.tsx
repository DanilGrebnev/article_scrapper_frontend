import { Box, Typography, Alert } from "@mui/material"
import { JsonViewer } from "@textea/json-viewer"
import { useGetArticlesAfterSearch } from "@/entities/articles/api/articles"

export function SearchResults() {
	const { data, error, status, hasResult } = useGetArticlesAfterSearch()

	return (
		<Box sx={{ mt: 4 }}>
			{status === "error" && error && (
				<Alert
					severity="error"
					sx={{ mb: 1, py: 0.5 }}
					variant="outlined"
				>
					{error.message}
				</Alert>
			)}

			{!hasResult && (
				<Typography
					variant="body2"
					color="text.secondary"
					textAlign="center"
				>
					Заполните форму и нажмите «Поиск»
				</Typography>
			)}

			{data !== undefined && (
				<Box>
					<JsonViewer
						value={data}
						defaultInspectDepth={2}
						rootName={false}
					/>
				</Box>
			)}
		</Box>
	)
}
