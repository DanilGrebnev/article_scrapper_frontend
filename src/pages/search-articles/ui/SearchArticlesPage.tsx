import { Container } from "@mui/material"
import { ArticleSearch } from "@/widgets/ArticleSearch"

export function SearchArticlesPage() {
	return (
		<Container sx={{ py: 4 }}>
			<ArticleSearch />
		</Container>
	)
}
