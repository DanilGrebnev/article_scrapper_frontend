import { Tabs } from "@heroui/react"
import { useLocation, useNavigate } from "react-router-dom"

const tabs = [
	{ id: "/", label: "Поиск статей" },
	{ id: "/history", label: "История поиска" },
	{ id: "/ai-test", label: "Тест" },
]

export function NavTabs() {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<Tabs
			selectedKey={pathname}
			onSelectionChange={(key) => navigate(String(key))}
		>
			<Tabs.ListContainer>
				<Tabs.List aria-label="Навигация">
					{tabs.map((tab) => (
						<Tabs.Tab key={tab.id} id={tab.id}>
							{tab.label}
							<Tabs.Indicator />
						</Tabs.Tab>
					))}
				</Tabs.List>
			</Tabs.ListContainer>
		</Tabs>
	)
}
