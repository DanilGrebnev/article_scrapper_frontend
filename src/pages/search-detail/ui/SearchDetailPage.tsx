import { useNavigate } from "react-router-dom"
import { Alert, Button, Container, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { RequestDetail } from "@/entities/articles"
import { SearchStatusAlert } from "@/shared/ui/SearchStatusAlert"
import { useGetArticlesAfterSearch } from "@/entities/articles/api/articles"
import type { SearchResponse } from "@/entities/articles/model/types"

export function SearchDetailPage() {
	const navigate = useNavigate()
	const { data, error, status, hasResult, variables } =
		useGetArticlesAfterSearch()
	const response = data as SearchResponse | undefined

	return (
		<Container sx={{ py: 4 }}>
			<Button
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate("/")}
				size="small"
				sx={{ mb: 2 }}
			>
				Назад к поиску
			</Button>

			<Typography variant="h5" component="h1" gutterBottom>
				Детализация поиска
			</Typography>

			{!hasResult && (
				<Alert severity="info" variant="outlined">
					Нет данных. Сначала выполните поиск на главной странице.
				</Alert>
			)}

			<SearchStatusAlert status={status} error={error} />

			{response && (
				<RequestDetail response={response} variables={variables} />
			)}
		</Container>
	)
}
