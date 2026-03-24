export interface AuthParams {
	login: string
	password: string
}

export interface RegisterParams {
	name: string
	last_name: string
	username: string
	email: string
	password: string
}

export type RegisterFormValues = RegisterParams & {
	confirmPassword: string
}

export interface TokenBundle {
	access_token: string
	refresh_token: string
	token_type: string
	expires_in: number
}

export interface User {
	username: string
	email: string
}
