import type { TArticleList } from "../../../model/types"
import { ArticleCard } from "../ArticleCard/ArticleCard"
import styles from "./RenderArticleList.module.scss"

interface RenderArticleListProps {
	articles: TArticleList
}

/**Рендер списка статей */
export function RenderArticleList({ articles }: RenderArticleListProps) {
	if (!articles.length) {
		return <p className={styles.empty}>Нет результатов</p>
	}

	return (
		<div className={styles.list}>
			{articles.map((article) => (
				<div key={article.id} className={styles.item}>
					<ArticleCard article={article} /> 
				</div>
			))}
		</div>
	)
}
