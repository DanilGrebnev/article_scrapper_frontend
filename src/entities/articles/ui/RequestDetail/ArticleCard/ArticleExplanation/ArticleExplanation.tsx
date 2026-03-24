import { Box, Typography } from "@mui/material"

interface ArticleExplanationProps {
	explanation: string
}

/**
 * Отображает пояснение к статье (почему она попала в результаты поиска).
 */
export function ArticleExplanation({ explanation }: ArticleExplanationProps) {
	return (
		<Box
			sx={{
				mt: 1.5,
				p: 1.5,
				bgcolor: "grey.50",
				borderRadius: 1,
			}}
		>
			<Typography variant="caption" color="text.secondary" fontWeight={600}>
				Объяснение
			</Typography>
			<Typography variant="body2">{explanation}</Typography>
		</Box>
	)
}
