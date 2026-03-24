import { AnimatePresence, motion } from "motion/react"
import {
	SearchForm,
	SearchResults,
	useSearchArticles,
	useGetArticlesAfterSearch,
} from "@/entities/articles"
import styles from "./ArticleSearch.module.scss"

export function ArticleSearch() {
	const { search, isPending } = useSearchArticles()
	const { data, hasResult } = useGetArticlesAfterSearch()
	const hasData = hasResult && data !== undefined

	return (
		<div className={styles.wrapper}>
			<SearchForm onSearch={search} isPending={isPending} />

			<AnimatePresence>
				{hasData && (
					<motion.div
						key="results"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
					>
						<SearchResults />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
