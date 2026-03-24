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
			<motion.div
				layout
				transition={{ duration: 0.4, ease: "easeInOut" }}
				style={{
					width: 420,
					flexShrink: 0,
					marginInline: hasData ? "0" : "auto",
				}}
			>
				<SearchForm onSearch={search} isPending={isPending} />
			</motion.div>

			<AnimatePresence>
				{hasData && (
					<motion.div
						key="results"
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 40 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						style={{ flex: 1, minWidth: 0 }}
					>
						<SearchResults />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
