import { UserMenu } from "@/entities/user"
import { NavTabs } from "./NavTabs/NavTabs"
import styles from "./Header.module.scss"

export function Header() {
	return (
		<header className={styles.header}>
			<NavTabs />
			<UserMenu />
		</header>
	)
}
