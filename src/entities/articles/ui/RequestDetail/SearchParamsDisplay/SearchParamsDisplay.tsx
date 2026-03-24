import { Box, Chip, Typography } from "@mui/material"
import type { SearchParams } from "../../../model/types"

interface SearchParamsDisplayProps {
	data: SearchParams
}

/**
 * Отображает параметры поискового запроса в виде чипов (ключ: значение).
 */
export function SearchParamsDisplay({ data }: SearchParamsDisplayProps) {
	return (
		<Box sx={{ mb: 3 }}>
			<Typography variant="subtitle2" gutterBottom>
				Параметры запроса
			</Typography>
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
				{Object.entries(data).map(([key, value]) => {
					if (
						value === undefined ||
						value === "" ||
						(typeof value === "number" && isNaN(value))
					)
						return null
					return (
						<Chip
							key={key}
							label={`${key}: ${value}`}
							size="small"
							variant="outlined"
						/>
					)
				})}
			</Box>
		</Box>
	)
}
