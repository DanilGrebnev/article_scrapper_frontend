import { useLocation, useNavigate } from "react-router-dom"
import { TabsField } from "@/shared/ui/TabsField"

const tabs = [
	{ key: "/", value: "Поиск статей" },
	{ key: "/history", value: "История поиска" },
	{ key: "/ai-test", value: "Тест" },
] as const

export function NavTabs() {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<TabsField
			items={tabs}
			selectedKey={pathname as (typeof tabs)[number]["key"]}
			onSelectionChange={(key) => navigate(key)}
			ariaLabel="Навигация"
		/>
	)
}
