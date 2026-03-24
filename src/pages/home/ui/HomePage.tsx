import { Container } from "@mui/material"
import { ArticleSearch } from "@/widgets/ArticleSearch"

export function HomePage() {
	return (
		<Container maxWidth={false} sx={{ py: 4 }}>
			<ArticleSearch />
		</Container>
	)
}
