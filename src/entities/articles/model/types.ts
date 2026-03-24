export interface SearchParams {
	target_theme?: string
	field_knowledge?: string
	target_context?: string
	language?: string
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
	filters: SearchParams
}

export interface ArticleSearchStartResponse {
	request_id: string
	status: string
}

export interface HistoryAmountArticles {
	high_match: number
	medium_match: number
	low_match: number
}

export interface HistoryListItem {
	id: number
	target_theme: string
	field_knowledge: string
	dateFrom: number
	dateTo: number
	amount_articles: HistoryAmountArticles
}

export type CheckSearchResponse =
	| { status: "process"; message: string }
	| { status: "error"; message: string }
	| { status: "success"; result: SearchResponse }
