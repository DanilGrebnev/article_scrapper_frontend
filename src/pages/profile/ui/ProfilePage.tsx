import { Avatar, Button, Chip } from "@heroui/react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/app/auth/AuthProvider"
import styles from "./ProfilePage.module.scss"

function formatDate(iso: string): string {
	return new Date(iso).toLocaleString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}

function formatBalance(value: number): string {
	return value.toLocaleString("ru-RU", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})
}

const STATUS_COLOR: Record<string, "success" | "warning" | "danger"> = {
	active: "success",
	inactive: "warning",
	blocked: "danger",
}

export function ProfilePage() {
	const { user, logout } = useAuth()

	if (!user) return null

	const initials = `${user.name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
	const fullName = `${user.name} ${user.last_name}`

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<Avatar size="lg" color="accent">
					<Avatar.Fallback>{initials}</Avatar.Fallback>
				</Avatar>
				<div>
					<p className={styles.name}>{fullName}</p>
					<p className={styles.username}>@{user.username}</p>
				</div>
				<Chip
					size="sm"
					variant="flat"
					color={STATUS_COLOR[user.status] ?? "default"}
					className={styles.statusChip}
				>
					{user.status}
				</Chip>
			</div>

			<div className={styles.grid}>
				<div className={styles.card}>
					<p className={styles.cardTitle}>Баланс</p>
					<p className={styles.cardValue}>{formatBalance(user.balance)} ₽</p>
				</div>
				<div className={styles.card}>
					<p className={styles.cardTitle}>Логин</p>
					<p className={styles.cardValue}>{user.username}</p>
				</div>
				<div className={styles.card}>
					<p className={styles.cardTitle}>Дата регистрации</p>
					<p className={styles.cardValue}>{formatDate(user.datetime)}</p>
				</div>
				<div className={styles.card}>
					<p className={styles.cardTitle}>ID</p>
					<p className={styles.cardValue}>{user.id}</p>
				</div>
			</div>

			<Button variant="outline" onPress={() => logout()}>
				<LogOut size={16} />
				Выйти
			</Button>
		</div>
	)
}
