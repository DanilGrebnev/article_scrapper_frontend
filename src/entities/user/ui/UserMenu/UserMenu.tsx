import { Button } from "@heroui/react"
import { Link } from "react-router-dom"
import type { User } from "../../model/types"
import styles from "./UserMenu.module.scss"

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
			<Link to="/login">
				<Button size="sm" variant="outline">Войти</Button>
			</Link>
		)
	}

	return (
		<Link to="/profile" className={styles.link}>
			<div className={styles.info}>
				<span className={styles.balance}>
					{user.balance.toLocaleString("ru-RU")} ₽
				</span>
				<span className={styles.nickname}>{user.nickname}</span>
			</div>
		</Link>
	)
}
