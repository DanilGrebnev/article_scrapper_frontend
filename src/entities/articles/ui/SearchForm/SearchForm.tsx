import { Controller, useForm } from "react-hook-form"
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
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
		},
	})

	return (
		<Box component="form" onSubmit={handleSubmit(onSearch)} noValidate>
			<Stack spacing={2}>
				<TextField
					label="Title"
					size="small"
					fullWidth
					{...register("title")}
				/>
				<TextField
					label="Description"
					size="small"
					fullWidth
					multiline
					minRows={2}
					{...register("description")}
				/>
				<TextField
					label="Abstract Description"
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
