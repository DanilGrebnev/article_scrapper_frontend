import { Link } from "react-router-dom"
import { Box, Button, Typography, Alert } from "@mui/material"
import { JsonViewer } from "@textea/json-viewer"
import { useGetArticlesAfterSearch } from "@/entities/articles/api/articles"

export function SearchResults() {
	const { data, error, status, hasResult } = useGetArticlesAfterSearch()

	return (
		<Box>
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
					<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
						<Button
							component={Link}
							to="/search-detail"
							size="small"
							variant="outlined"
						>
							Подробнее
						</Button>
					</Box>
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
