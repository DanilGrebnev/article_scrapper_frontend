import { AnimatePresence, motion } from "motion/react"
import {
	SearchForm,
	SearchResults,
	useArticleSearchJob,
} from "@/entities/articles"
import styles from "./ArticleSearch.module.scss"

export function ArticleSearch() {
	const { startSearch, isBusy, data, error, statusMessage } =
		useArticleSearchJob()

	return (
		<div className={styles.wrapper}>
			<SearchForm onSearch={startSearch} isPending={isBusy} />

			{error && (
				<p className={styles.error}>{error}</p>
			)}

			{isBusy && statusMessage && (
				<p className={styles.status}>{statusMessage}</p>
			)}

			<AnimatePresence>
				{data && (
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
