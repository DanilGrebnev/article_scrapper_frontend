export type SearchDiscipline = "Metallurgy" | "Economics"

export interface SearchParams {
	target_theme?: string
	field_knowledge?: string
	target_context?: string
	language?: string
	discipline?: SearchDiscipline
	theme?: string
	dateFrom?: number
	dateTo?: number
	openAccess?: boolean
}

export interface ComparisonRule {
	rule: string
	description: string
}

export interface MatchedArticle {
	id: string
	t_title: string
	t_abstract: string
	explanation: string
	comparison_of_rules: ComparisonRule[]
	title: string
	link?: string
	description?: string
	abstract?: string
	authors?: string
	published?: string
	publications_type?: string
	openAccess?: boolean
}

export interface SearchResponse {
	high_match: MatchedArticle[]
	medium_match: MatchedArticle[]
	low_match: MatchedArticle[]
}
