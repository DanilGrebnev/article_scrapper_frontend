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

export interface TComparisonRule {
	rule: string
	description: string
}

type TArticleOriginal = {
	abstract: string
	authors: string
	description: string
	is_access: boolean
	link: string
	publications_type: string
	publish_link: string
	publish_name: string
	published: string
	title:string
}

export interface TArticle {
	id: string
	t_title: string
	t_abstract: string
	explanation: string
	comparison_of_rules: TComparisonRule[]
	title: string
	link?: string
	description?: string
	abstract?: string
	authors?: string
	published?: string
	publications_type?: string
	openAccess?: boolean
	original: TArticleOriginal

}

export type TArticleList = TArticle[] 

export interface TArticleHistoryDetail {
	high_match: TArticleList
	medium_match: TArticleList
	low_match: TArticleList
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
	| { status: "success"; result: TArticleHistoryDetail }
