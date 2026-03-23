export interface SearchParams {
	title?: string
	description?: string
	abstract_description?: string
	language?: string
}

export interface Article {
	id: string | number
	title: string
	description: string
	abstract_description: string
	language: string
}
