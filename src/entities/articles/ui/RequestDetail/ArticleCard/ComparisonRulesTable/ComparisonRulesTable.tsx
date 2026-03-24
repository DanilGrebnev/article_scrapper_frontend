import { useState } from "react"
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { ComparisonRule } from "../../../../model/types"

interface ComparisonRulesTableProps {
	rules: ComparisonRule[]
}

/**
 * Отображает правила сравнения в раскрывающемся Accordion.
 * Показывает таблицу: правило — описание.
 */
export function ComparisonRulesTable({ rules }: ComparisonRulesTableProps) {
	const [expanded, setExpanded] = useState(false)

	return (
		<Accordion
			expanded={expanded}
			onChange={() => setExpanded(!expanded)}
			disableGutters
			elevation={0}
			sx={{ mt: 1.5, "&::before": { display: "none" } }}
		>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 36 }}>
				<Typography variant="body2" fontWeight={600}>
					Правила сравнения ({rules.length})
				</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ px: 0 }}>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 600 }}>Правило</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>Описание</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rules.map((rule, i) => (
								<TableRow key={i}>
									<TableCell sx={{ verticalAlign: "top" }}>{rule.rule}</TableCell>
									<TableCell>{rule.description}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</AccordionDetails>
		</Accordion>
	)
}
