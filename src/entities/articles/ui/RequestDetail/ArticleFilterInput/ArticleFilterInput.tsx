// import { Input, TextField } from "@heroui/react"
import { Search } from "lucide-react"
import {InputField } from '@/shared/ui/InputField'

interface ArticleFilterInputProps {
	value: string
	onChange: (value: string) => void
}

export function ArticleFilterInput({ value, onChange }: ArticleFilterInputProps) {
	return (
		<InputField
			placeholder="Поиск по заголовку, аннотации, авторам..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
			fullWidth
			variant="secondary"
		/>
	)
}
