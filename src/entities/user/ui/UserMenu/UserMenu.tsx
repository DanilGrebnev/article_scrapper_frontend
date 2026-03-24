import { Button } from "@heroui/react"
import { Link } from "react-router-dom"
import type { User } from "../../model/types"
import styles from "./UserMenu.module.scss"

interface UserMenuProps {
	user?: User | null
}

export function UserMenu({ user }: UserMenuProps) {
	if (!user) {
		return (
			<Link to="/login">
				<Button size="sm" variant="outline">
					Войти
				</Button>
			</Link>
		)
	}

	return (
		<Link to="/profile" className={styles.link}>
			<div className={styles.info}>
				<span className={styles.nickname}>{user.username}</span>
			</div>
		</Link>
	)
}
