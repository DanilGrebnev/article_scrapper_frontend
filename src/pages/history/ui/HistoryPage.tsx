import { Container, Typography } from "@mui/material"

export function HistoryPage() {
	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h5" component="h1" gutterBottom>
				История поиска
			</Typography>
			<Typography color="text.secondary">
				Здесь будет отображаться история поисковых запросов
			</Typography>
		</Container>
	)
}
