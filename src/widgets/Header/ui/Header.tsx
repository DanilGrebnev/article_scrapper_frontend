import { AppBar, Toolbar, Button, Stack } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

const NAV_ITEMS = [
	{ label: "Поиск статей", path: "/" },
	{ label: "История поиска", path: "/history" },
]

export function Header() {
	const { pathname } = useLocation()

	return (
		<AppBar position="static" color="default" elevation={1}>
			<Toolbar variant="dense">
				<Stack direction="row" spacing={1}>
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
				</Stack>
			</Toolbar>
		</AppBar>
	)
}
