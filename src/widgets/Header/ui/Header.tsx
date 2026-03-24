import { Box, Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { UserMenu } from "@/entities/user"
import styles from "./Header.module.scss"

const NAV_ITEMS = [
	{ label: "Поиск статей", path: "/" },
	{ label: "История поиска", path: "/history" },
	{ label: "Тест", path: "/ai-test" },
]

export function Header() {
	const { pathname } = useLocation()

	return (
		<header className={styles.header}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				{NAV_ITEMS.map(({ label, path }) => (
					<Button
						key={path}
						component={Link}
						to={path}
						variant={pathname === path ? "contained" : "text"}
						size="small"
					>
						{label}
					</Button>
				))}
			</Box>
			<UserMenu />
		</header>
	)
}
