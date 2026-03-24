import { useAuth } from "@/app/auth/AuthProvider"
import { UserMenu } from "@/entities/user"
import { NavTabs } from "./NavTabs/NavTabs"
import styles from "./Header.module.scss"

export function Header() {
	// TODO: вернуть проверку авторизации когда бэкенд будет готов
	// const { isAuthReady, isAuthenticated, user } = useAuth()
	// if (!isAuthReady || !isAuthenticated) return null
	const { user } = useAuth()

	return (
		<header className={styles.header}>
			<NavTabs />
			<UserMenu user={user} />
		</header>
	)
}
