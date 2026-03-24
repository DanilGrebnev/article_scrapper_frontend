import { Box, Chip, Divider, Typography } from "@mui/material"

interface MatchSectionHeaderProps {
	label: string
	color: string
	bg: string
	count: number
}

/**
 * Заголовок секции совпадений: разделитель, подпись и чип с количеством статей.
 */
export function MatchSectionHeader({ label, color, bg, count }: MatchSectionHeaderProps) {
	return (
		<>
			<Divider sx={{ mb: 2 }} />
			<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
				<Typography variant="h6" sx={{ color }}>
					{label}
				</Typography>
				<Chip
					label={count}
					size="small"
					sx={{ bgcolor: bg, color, fontWeight: 700 }}
				/>
			</Box>
		</>
	)
}
