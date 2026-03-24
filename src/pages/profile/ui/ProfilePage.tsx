import { Avatar } from "@heroui/react"
import styles from "./ProfilePage.module.scss"

const MOCK_USER = {
	nickname: "TestUser",
	email: "testuser@example.com",
	balance: 1500,
}

export function ProfilePage() {
	const initials = MOCK_USER.nickname.slice(0, 2).toUpperCase()

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<Avatar size="lg" color="accent">
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar>
				<div>
					<p className={styles.name}>{MOCK_USER.nickname}</p>
					<p className={styles.email}>{MOCK_USER.email}</p>
				</div>
			</div>

			<div className={styles.card}>
				<p className={styles.cardTitle}>Баланс</p>
				<p className={styles.cardValue}>
					{MOCK_USER.balance.toLocaleString("ru-RU")} ₽
				</p>
			</div>
		</div>
	)
}
