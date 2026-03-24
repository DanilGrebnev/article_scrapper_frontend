import { Controller, useForm } from "react-hook-form"
import { Button, Spinner } from "@heroui/react"
import { DateRangeFields } from "./DateRangeFields/DateRangeFields"
import { SelectField } from "@/shared/ui/SelectField"
import { CheckboxField } from "@/shared/ui/CheckboxField"
import { InputField } from "@/shared/ui/InputField"
import { TextAreaField } from "@/shared/ui/TextAreaField"

import { Search } from "lucide-react"
import type { SearchParams } from "@/entities/articles/model/types"
import type { PollStatusData } from "@/entities/articles/api/articles"
import { SEARCH_PARAM_LABELS } from "../../lib/searchParamLabels"
import styles from "./SearchForm.module.scss"

const LANGUAGE_OPTIONS = [
	{ value: "russian", label: "russian" },
	{ value: "english", label: "english" },
	{ value: "deutsch", label: "deutsch" },
	{ value: "french", label: "french" },
	{ value: "spanish", label: "spanish" },
]

const FIELD_KNOWLEDGE_OPTIONS = [
	{ value: "Metallurgy", label: "Металлургия" },
	{ value: "Economics", label: "Экономика" },
]

interface SearchFormProps {
	onSearch: (params: SearchParams) => void
	isPending: boolean
	pollStatus?: PollStatusData | null
}

export function SearchForm({
	onSearch,
	isPending,
	pollStatus,
}: SearchFormProps) {
	const { handleSubmit, control, trigger, getValues } = useForm<SearchParams>(
		{
			mode: "onChange",
			// TODO: убрать мок-данные
			defaultValues: {
				target_theme: "Легирование чугунных отливок в литейной форме",
				field_knowledge: "Metallurgy",
				target_context:
					"Поверхностное легирование чугунных отливок в литейной форме; Создание поверхностных слоёв на отливке при литье чугуна в форму",
				language: "russian",
				theme: "surface alloying of iron castings in a mold",
				dateFrom: 2024,
				dateTo: 2025,
				openAccess: true,
			},
		},
	)

	return (
		<form
			onSubmit={handleSubmit((data) => {
				onSearch(data)
				console.log(data)
			})}
			noValidate
		>
			<div className={styles.form}>
				<div>
					<p className={styles.sectionTitle}>
						Параметры фильтрации
					</p>
					<div className={styles.fields}>
						<Controller
							name="field_knowledge"
							control={control}
							render={({ field }) => (
								<SelectField
									label={SEARCH_PARAM_LABELS.field_knowledge}
									options={FIELD_KNOWLEDGE_OPTIONS}
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
						<Controller
							name="target_theme"
							control={control}
							render={({ field }) => (
								<InputField
									label={SEARCH_PARAM_LABELS.target_theme}
									placeholder="Тема по которой нужно искать"
									{...field}
								/>
							)}
						/>
						<Controller
							name="target_context"
							control={control}
							render={({ field }) => (
								<TextAreaField
									label={SEARCH_PARAM_LABELS.target_context}
									placeholder={SEARCH_PARAM_LABELS.target_context}
									rows={3}
									{...field}
								/>
							)}
						/>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<SelectField
									label={SEARCH_PARAM_LABELS.language}
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
						<Controller
							name="theme"
							control={control}
							render={({ field }) => (
								<InputField
									label={SEARCH_PARAM_LABELS.theme}
									{...field}
								/>
							)}
						/>
						<DateRangeFields
							control={control}
							trigger={trigger}
							getValues={getValues}
						/>
						<Controller
							name="openAccess"
							control={control}
							render={({ field }) => (
								<CheckboxField
									label={SEARCH_PARAM_LABELS.openAccess}
									isSelected={field.value ?? false}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
					</div>
				</div>

				<div className={styles.submitRow}>
					<Button
						type="submit"
						variant="primary"
						isDisabled={isPending}
					>
						{isPending ? (
							<Spinner size="sm" />
						) : (
							<Search size={16} />
						)}
						Поиск
					</Button>

					{pollStatus && (
						<span
							className={
								pollStatus.status === "error"
									? styles.pollError
									: styles.pollProcess
							}
						>
							{pollStatus.message}
						</span>
					)}
				</div>
			</div>
		</form>
	)
}
