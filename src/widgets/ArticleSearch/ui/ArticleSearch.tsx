import { Box } from "@mui/material"
import {
	SearchForm,
	SearchResults,
	useSearchArticles,
} from "@/entities/articles"

export function ArticleSearch() {
	const { search, isPending } = useSearchArticles()

	return (
		<Box sx={{ maxWidth: 720, mx: "auto" }}>
			<SearchForm onSearch={search} isPending={isPending} />
			<SearchResults />
		</Box>
	)
}
