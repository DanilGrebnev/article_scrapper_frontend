import { Avatar, Button } from "@heroui/react"
import { useAuth } from "@/app/auth/AuthProvider"
import styles from "./ProfilePage.module.scss"

export function ProfilePage() {
	const { user, logout } = useAuth()
	const initials = (user?.username ?? "??").slice(0, 2).toUpperCase()

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<Avatar size="lg" color="accent">
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar>
				<div>
					<p className={styles.name}>{user?.username}</p>
					<p className={styles.email}>{user?.email}</p>
				</div>
			</div>
			<Button variant="outline" onPress={() => logout()}>
				Выйти
			</Button>
		</div>
	)
}
