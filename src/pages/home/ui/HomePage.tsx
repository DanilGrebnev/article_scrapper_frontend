import { Container } from "@mui/material"
import { ArticleSearch } from "@/widgets/ArticleSearch"

export function HomePage() {
	return (
		<Container sx={{ py: 4 }}>
			<ArticleSearch />
		</Container>
	)
}
