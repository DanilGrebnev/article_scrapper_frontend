import { Controller, useForm } from "react-hook-form"
import {
	Button,
	Checkbox,
	Input,
	Label,
	ListBox,
	Select,
	Spinner,
	TextArea,
	TextField,
} from "@heroui/react"
import { DateRangeFields } from "./DateRangeFields/DateRangeFields"

import { Search } from "lucide-react"
import type {
	SearchDiscipline,
	SearchParams,
} from "@/entities/articles/model/types"
import styles from "./SearchForm.module.scss"

const LANGUAGES = ["russian", "english", "deutsch", "french", "spanish"]

const DISCIPLINE_OPTIONS: { value: SearchDiscipline; label: string }[] = [
	{ value: "Metallurgy", label: "Металлургия" },
	{ value: "Economics", label: "Экономика" },
]

interface SearchFormProps {
	onSearch: (params: SearchParams) => void
	isPending: boolean
}

export function SearchForm({ onSearch, isPending }: SearchFormProps) {
	const { register, handleSubmit, control } = useForm<SearchParams>({
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
								<Select
									value={field.value}
									onChange={(val) => {
										if (val) field.onChange(val)
									}}
								>
									<Label>Направление</Label>
									<Select.Trigger>
										<Select.Value />
										<Select.Indicator />
									</Select.Trigger>
									<Select.Popover>
										<ListBox>
											{DISCIPLINE_OPTIONS.map(
												({ value, label }) => (
													<ListBox.Item
														key={value}
														id={value}
													>
														{label}
													</ListBox.Item>
												),
											)}
										</ListBox>
									</Select.Popover>
								</Select>
							)}
						/>
						<TextField>
							<Label>Целевая тема</Label>
							<Input
								placeholder="Тема по которой нужно искать"
								{...register("target_theme")}
							/>
						</TextField>
						<TextField>
							<Label>Раскрытие темы</Label>
							<TextArea
								placeholder="Раскрытие темы"
								rows={2}
								{...register("field_knowledge")}
							/>
						</TextField>
						<TextField>
							<Label>Ключевые фразы и слова</Label>
							<TextArea
								placeholder="Ключевые слова и фразы помогающие лучше понять тему"
								rows={2}
								{...register("target_context")}
							/>
						</TextField>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<Select
									value={field.value}
									onChange={(val) => {
										if (val) field.onChange(val)
									}}
								>
									<Label>Language</Label>
									<Select.Trigger>
										<Select.Value />
										<Select.Indicator />
									</Select.Trigger>
									<Select.Popover>
										<ListBox>
											{LANGUAGES.map((lang) => (
												<ListBox.Item
													key={lang}
													id={lang}
												>
													{lang}
												</ListBox.Item>
											))}
										</ListBox>
									</Select.Popover>
								</Select>
							)}
						/>
					</div>
				</div>

				<div>
					<p className={styles.sectionTitle}>
						Параметры поиска статей
					</p>
					<div className={styles.fields}>
						<TextField>
							<Label>Theme</Label>
							<Input {...register("theme")} />
						</TextField>
						<DateRangeFields register={register} />
						<Controller
							name="openAccess"
							control={control}
							render={({ field }) => (
								<Checkbox
									isSelected={field.value ?? false}
									onChange={(isChecked) =>
										field.onChange(isChecked)
									}
								>
									<Checkbox.Control>
										<Checkbox.Indicator />
									</Checkbox.Control>
									<Checkbox.Content>
										<Label>Open access</Label>
									</Checkbox.Content>
								</Checkbox>
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
