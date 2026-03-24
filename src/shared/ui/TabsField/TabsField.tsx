import { Tabs } from "@heroui/react"
import type { ReactNode } from "react"

export interface TabItem<T extends string> {
	key: T
	value: ReactNode
}

interface TabsFieldProps<T extends string> {
	items: ReadonlyArray<TabItem<T>>
	selectedKey?: T
	onSelectionChange?: (key: T) => void
	ariaLabel?: string
}

/**
 * Обёртка над `@heroui Tabs` для декларативного использования.
 *
 * Принимает массив `items: { key, value }[]`:
 * - `key` — строковый литеральный тип (T extends string), нужен для `selectedKey`
 *   и колбэка `onSelectionChange`; выводится автоматически из массива.
 * - `value` — ReactNode: строка, элемент с иконкой, что угодно.
 *
 * ```tsx
 * // Строки
 * const tabs = [
 *   { key: "/", value: "Поиск" },
 *   { key: "/history", value: "История" },
 * ] as const
 *
 * // С иконкой
 * const tabs = [
 *   { key: "list", value: <><ListIcon /> Список</> },
 *   { key: "grid", value: <><GridIcon /> Сетка</> },
 * ]
 *
 * <TabsField
 *   items={tabs}
 *   selectedKey={pathname}
 *   onSelectionChange={(key) => navigate(key)} // key: "/" | "/history"
 * />
 * ```
 */
export function TabsField<T extends string>({
	items,
	selectedKey,
	onSelectionChange,
	ariaLabel,
}: TabsFieldProps<T>) {
	return (
		<Tabs
			selectedKey={selectedKey}
			onSelectionChange={(key) => onSelectionChange?.(key as T)}
		>
			<Tabs.ListContainer>
				<Tabs.List aria-label={ariaLabel}>
					{items.map((tab) => (
						<Tabs.Tab key={tab.key} id={tab.key}>
							{tab.value}
							<Tabs.Indicator />
						</Tabs.Tab>
					))}
				</Tabs.List>
			</Tabs.ListContainer>
		</Tabs>
	)
}
