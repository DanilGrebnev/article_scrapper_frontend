import { Alert, Spinner } from "@heroui/react"

interface SearchStatusAlertProps {
	status?: "idle" | "pending" | "error" | "success"
	error?: Error | null
}

export function SearchStatusAlert({ status, error }: SearchStatusAlertProps) {
	if (status === "error" && error) {
		return <Alert color="danger">{error.message}</Alert>
	}

	if (status === "pending") {
		return <Spinner size="sm" />
	}

	return null
}
