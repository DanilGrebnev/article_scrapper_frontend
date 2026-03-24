import { ArticleSearch } from "@/widgets/ArticleSearch"
import styles from "./SearchArticlesPage.module.scss"

export function SearchArticlesPage() {
	return (
		<div className={styles.page}>
			<ArticleSearch />
		</div>
	)
}
