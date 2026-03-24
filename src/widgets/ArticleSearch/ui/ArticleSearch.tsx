import { AnimatePresence, motion } from "motion/react"
import {
	SearchForm,
	SearchResults,
	useStartSearch,
	useCheckResult,
	useBootstrapSearch,
	useArticleSearchResult,
} from "@/entities/articles"
import styles from "./ArticleSearch.module.scss"

export function ArticleSearch() {
	const { start, isPending: isStarting, error: startError } = useStartSearch()
	const { poll, isPolling, data: pollStatus } = useCheckResult()

	const data = useArticleSearchResult()

	useBootstrapSearch(poll)

	const handleSearch = async (params: Parameters<typeof start>[0]) => {
		const id = await start(params)
		if (!id) return
		poll(id)
	}

	const isBusy = isStarting || isPolling

	return (
		<div className={styles.wrapper}>
			<SearchForm
				onSearch={handleSearch}
				isPending={isBusy}
				pollStatus={pollStatus}
			/>

			{startError && <p className={styles.error}>{startError}</p>}

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
