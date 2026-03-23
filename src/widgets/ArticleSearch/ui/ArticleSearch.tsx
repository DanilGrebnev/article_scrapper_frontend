import { Box, Typography } from "@mui/material"
import {
	SearchForm,
	SearchResults,
	useSearchArticles,
} from "@/entities/articles"

export function ArticleSearch() {
	const { search, isPending } = useSearchArticles()

	return (
		<Box sx={{ maxWidth: 720, mx: "auto" }}>
			<Typography variant="h5" component="h1" gutterBottom>
				Поиск статей
			</Typography>

			<SearchForm onSearch={search} isPending={isPending} />
			<SearchResults />
		</Box>
	)
}
