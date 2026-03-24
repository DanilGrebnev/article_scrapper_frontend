import styles from "./RequestDetailSkeleton.module.scss"

const CARDS_PER_SECTION = 3
const PARAM_CHIP_WIDTHS = [110, 150, 130, 90]

function SectionSkeleton() {
	return (
		<div>
			<hr className={styles.divider} />
			<div className={styles.sectionHeaderRow}>
				<span className={styles.sectionLabel} />
				<span className={styles.sectionCount} />
			</div>
			<div className={styles.cardList}>
				{Array.from({ length: CARDS_PER_SECTION }, (_, i) => (
					<div key={i} className={styles.card}>
						<span className={styles.cardId} />
						<span className={styles.cardTitle} />
						<span className={styles.cardAbstract1} />
						<span className={styles.cardAbstract2} />
						<span className={styles.cardAuthors} />
						<span className={styles.cardLink} />
					</div>
				))}
			</div>
		</div>
	)
}

export function RequestDetailSkeleton() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.paramsBlock}>
				<span className={styles.paramsTitle} />
				<div className={styles.paramsChips}>
					{PARAM_CHIP_WIDTHS.map((w, i) => (
						<span
							key={i}
							className={styles.paramChip}
							style={{ width: w }}
						/>
					))}
				</div>
			</div>

			<span className={styles.filterInput} />

			<div className={styles.sections}>
				<SectionSkeleton />
				<SectionSkeleton />
				<SectionSkeleton />
			</div>
		</div>
	)
}
