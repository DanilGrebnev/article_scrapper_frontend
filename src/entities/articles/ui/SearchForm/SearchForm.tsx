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

const LANGUAGES: { code: string; name: string }[] = [
	{ code: "ru", name: "russian" },
	{ code: "en", name: "english" },
	{ code: "de", name: "deutsch" },
	{ code: "fr", name: "french" },
	{ code: "es", name: "spanish" },
]

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
			language: "ru",
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
								{LANGUAGES.map(({ code, name }) => (
									<MenuItem key={code} value={code}>
										{name}
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
