import { Button } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
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
		</header>
	)
}
