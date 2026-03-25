import { Disclosure } from "@heroui/react"
import type { TComparisonRule } from "../../../../model/types"
import styles from "./ComparisonRulesTable.module.scss"

interface ComparisonRulesTableProps {
	rules: TComparisonRule[]
}

/**
 * Отображает правила сравнения в раскрывающемся Disclosure.
 * Показывает таблицу: правило — описание.
 */
export function ComparisonRulesTable({ rules }: ComparisonRulesTableProps) {
	return (
		<div className={styles.wrapper}>
			<Disclosure>
				<Disclosure.Heading>
					<Disclosure.Trigger className={styles.triggerRow}>
						<span className={styles.trigger}>
							Правила сравнения ({rules.length})
						</span>
						<Disclosure.Indicator />
					</Disclosure.Trigger>
				</Disclosure.Heading>
				<Disclosure.Content>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Правило</th>
								<th>Описание</th>
							</tr>
						</thead>
						<tbody>
							{rules.map((rule, i) => (
								<tr key={i}>
									<td>{rule.rule}</td>
									<td>{rule.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Disclosure.Content>
			</Disclosure>
		</div>
	)
}
