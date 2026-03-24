import { Alert, Typography } from "@mui/material"

interface SearchStatusAlertProps {
	status?: "idle" | "pending" | "error" | "success"
	error?: Error | null
}

export function SearchStatusAlert({ status, error }: SearchStatusAlertProps) {
	if (status === "error" && error) {
		return (
			<Alert severity="error" variant="outlined" sx={{ mb: 2 }}>
				{error.message}
			</Alert>
		)
	}

	if (status === "pending") {
		return (
			<Typography color="text.secondary">Загрузка...</Typography>
		)
	}

	return null
}
