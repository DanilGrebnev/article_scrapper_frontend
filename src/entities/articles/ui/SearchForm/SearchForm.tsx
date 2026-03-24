import { Controller, useForm } from "react-hook-form"
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import type { SearchParams } from "@/entities/articles/model/types"

const LANGUAGES = ["russian", "english", "deutsch", "french", "spanish"]

interface SearchFormProps {
	onSearch: (params: SearchParams) => void
	isPending: boolean
}

export function SearchForm({ onSearch, isPending }: SearchFormProps) {
	const { register, handleSubmit, control } = useForm<SearchParams>({
		defaultValues: {
			title: "",
			description: "",
			abstract_description: "",
			language: "russian",
			theme: "surface alloying of iron castings in a casting mold",
			dateFrom: 2016,
			dateTo: 2017,
			isAccess: false,
		},
	})

	return (
		<Box component="form" onSubmit={handleSubmit(onSearch)} noValidate>
			<Stack spacing={3}>
				<Box>
					<Typography variant="subtitle2" sx={{ mb: 1.5 }}>
						Параметры фильтрации
					</Typography>
					<Stack spacing={2}>
						<TextField
							label="Целевая тема"
							placeholder="Тема по которой нужно искать"
							size="small"
							fullWidth
							{...register("title")}
						/>
						<TextField
							label="Раскрытие темы"
							placeholder="Раскрытие темы"
							size="small"
							fullWidth
							multiline
							minRows={2}
							{...register("description")}
						/>
						<TextField
							label="Ключевые фразы и слова"
							placeholder="Ключевые слова и фразы помогающие лучше понять тему"
							size="small"
							fullWidth
							multiline
							minRows={2}
							{...register("abstract_description")}
						/>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<FormControl size="small" fullWidth>
									<InputLabel>Language</InputLabel>
									<Select {...field} label="Language">
										{LANGUAGES.map((lang) => (
											<MenuItem key={lang} value={lang}>
												{lang}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}
						/>
					</Stack>
				</Box>

				<Box>
					<Typography variant="subtitle2" sx={{ mb: 1.5 }}>
						Параметры поиска статей
					</Typography>
					<Stack spacing={2}>
						<TextField
							label="Theme"
							size="small"
							fullWidth
							{...register("theme")}
						/>
						<Stack direction="row" spacing={2}>
							<TextField
								label="Date From"
								size="small"
								fullWidth
								type="number"
								placeholder="2020"
								slotProps={{
									htmlInput: { min: 1000, max: 9999 },
								}}
								{...register("dateFrom", {
									valueAsNumber: true,
									min: 1000,
									max: 9999,
								})}
							/>
							<TextField
								label="Date To"
								size="small"
								fullWidth
								type="number"
								placeholder="2025"
								slotProps={{
									htmlInput: { min: 1000, max: 9999 },
								}}
								{...register("dateTo", {
									valueAsNumber: true,
									min: 1000,
									max: 9999,
								})}
							/>
						</Stack>
						<FormControlLabel
							control={
								<Checkbox
									size="small"
									{...register("isAccess")}
								/>
							}
							label="open access"
						/>
					</Stack>
				</Box>

				<Button
					type="submit"
					variant="contained"
					size="small"
					startIcon={
						isPending ? (
							<CircularProgress size={16} color="inherit" />
						) : (
							<SearchIcon fontSize="small" />
						)
					}
					disabled={isPending}
				>
					Поиск
				</Button>
			</Stack>
		</Box>
	)
}
