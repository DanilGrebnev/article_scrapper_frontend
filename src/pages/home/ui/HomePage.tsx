import { ArticleSearch } from "@/widgets/ArticleSearch"
import styles from "./HomePage.module.scss"

export function HomePage() {
	return (
		<div className={styles.page}>
			<ArticleSearch />
		</div>
	)
}
