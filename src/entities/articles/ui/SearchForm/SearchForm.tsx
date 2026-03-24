import { Controller, useForm } from "react-hook-form"
import { Button, Spinner } from "@heroui/react"
import { DateRangeFields } from "./DateRangeFields/DateRangeFields"
import { SelectField } from "@/shared/ui/SelectField"
import { CheckboxField } from "@/shared/ui/CheckboxField"
import { InputField } from "@/shared/ui/InputField"
import { TextAreaField } from "@/shared/ui/TextAreaField"

import { Search } from "lucide-react"
import type {
	SearchDiscipline,
	SearchParams,
} from "@/entities/articles/model/types"
import styles from "./SearchForm.module.scss"

const LANGUAGE_OPTIONS = [
	{ value: "russian", label: "russian" },
	{ value: "english", label: "english" },
	{ value: "deutsch", label: "deutsch" },
	{ value: "french", label: "french" },
	{ value: "spanish", label: "spanish" },
]

const DISCIPLINE_OPTIONS: { value: SearchDiscipline; label: string }[] = [
	{ value: "Metallurgy", label: "Металлургия" },
	{ value: "Economics", label: "Экономика" },
]

interface SearchFormProps {
	onSearch: (params: SearchParams) => void
	isPending: boolean
}

export function SearchForm({ onSearch, isPending }: SearchFormProps) {
	const { register, handleSubmit, control, trigger, getValues } = useForm<SearchParams>({
		mode: "onChange",
		defaultValues: {
			target_theme: "",
			field_knowledge: "",
			target_context: "",
			language: "russian",
			discipline: "Metallurgy",
			theme: "surface alloying of iron castings in a casting mold",
			dateFrom: 2024,
			dateTo: 2025,
			openAccess: false,
		},
	})

	return (
		<form onSubmit={handleSubmit(onSearch)} noValidate>
			<div className={styles.section}>
				<div>
					<p className={styles.sectionTitle}>Параметры фильтрации</p>
					<div className={styles.fields}>
						<Controller
							name="discipline"
							control={control}
							render={({ field }) => (
								<SelectField
									label="Направление"
									options={DISCIPLINE_OPTIONS}
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
						<InputField
							label="Целевая тема"
							placeholder="Тема по которой нужно искать"
							{...register("target_theme")}
						/>
						<TextAreaField
							label="Раскрытие темы"
							placeholder="Раскрытие темы"
							rows={2}
							{...register("field_knowledge")}
						/>
						<TextAreaField
							label="Ключевые фразы и слова"
							placeholder="Ключевые слова и фразы помогающие лучше понять тему"
							rows={2}
							{...register("target_context")}
						/>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<SelectField
									label="Language"
									options={LANGUAGE_OPTIONS}
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
					</div>
				</div>

				<div>
					<p className={styles.sectionTitle}>
						Параметры поиска статей
					</p>
					<div className={styles.fields}>
						<InputField label="Theme" {...register("theme")} />
						<DateRangeFields control={control} trigger={trigger} getValues={getValues} />
						<Controller
							name="openAccess"
							control={control}
							render={({ field }) => (
								<CheckboxField
									label="Open access"
									isSelected={field.value ?? false}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
					</div>
				</div>

				<Button type="submit" variant="primary" isDisabled={isPending}>
					{isPending ? <Spinner size="sm" /> : <Search size={16} />}
					Поиск
				</Button>
			</div>
		</form>
	)
}
