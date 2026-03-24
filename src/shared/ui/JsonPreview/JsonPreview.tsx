import styles from "./JsonPreview.module.scss"

interface JsonPreviewProps {
	data: unknown
}

export function JsonPreview({ data }: JsonPreviewProps) {
	return (
		<div className={styles.wrapper}>
			<pre className={styles.code}>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	)
}
