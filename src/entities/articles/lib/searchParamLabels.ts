import type { SearchParams } from "../model/types"

export const SEARCH_PARAM_LABELS: Record<keyof SearchParams, string> = {
	field_knowledge: "Область знаний (направление)",
	target_theme: "Целевая тема",
	target_context: "Раскрытие темы",
	language: "Language",
	theme: "Поиск на тему",
	dateFrom: "Год от",
	dateTo: "Год до",
	openAccess: "В открытом доступе",
}

export const SEARCH_PARAM_ORDER: (keyof SearchParams)[] = [
	"field_knowledge",
	"target_theme",
	"target_context",
	"language",
	"theme",
	"dateFrom",
	"dateTo",
	"openAccess",
]
