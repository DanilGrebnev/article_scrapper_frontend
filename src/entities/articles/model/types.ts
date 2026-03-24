export interface SearchParams {
	title?: string
	description?: string
	abstract_description?: string
	language?: string
	theme?: string
	dateFrom?: number
	dateTo?: number
	isAccess?: boolean
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
	is_access?: boolean
}

export interface SearchResponse {
	high_match: MatchedArticle[]
	medium_match: MatchedArticle[]
	low_match: MatchedArticle[]
}
