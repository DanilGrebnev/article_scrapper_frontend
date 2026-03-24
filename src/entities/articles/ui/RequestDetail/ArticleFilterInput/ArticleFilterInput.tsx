import { Input, TextField } from "@heroui/react"
import { Search } from "lucide-react"
import styles from "./ArticleFilterInput.module.scss"

interface ArticleFilterInputProps {
	value: string
	onChange: (value: string) => void
}

export function ArticleFilterInput({ value, onChange }: ArticleFilterInputProps) {
	return (
		<div className={styles.wrapper}>
			<TextField>
				<Input
					placeholder="Поиск по заголовку, аннотации, авторам..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
					startContent={<Search size={16} className={styles.icon} />}
				/>
			</TextField>
		</div>
	)
}
