import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import type { User } from "../../model/types"

const MOCK_USER: User = {
	nickname: "TestUser",
	balance: 1500,
}

interface UserMenuProps {
	user?: User | null
}

/**
 * Показывает ник и баланс пользователя, либо кнопку входа если не авторизован.
 */
export function UserMenu({ user = MOCK_USER }: UserMenuProps) {
	if (!user) {
		return (
			<Button
				component={Link}
				to="/login"
				size="small"
				variant="outlined"
			>
				Войти
			</Button>
		)
	}

	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
			<Typography variant="body2" color="text.secondary">
				{user.balance.toLocaleString("ru-RU")} ₽
			</Typography>
			<Typography variant="body2" fontWeight={600}>
				{user.nickname}
			</Typography>
		</Box>
	)
}
