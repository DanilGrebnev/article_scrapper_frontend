export interface AuthParams {
	email: string
	password: string
}

export interface RegisterParams {
	email: string
	password: string
	confirmPassword: string
}

export interface User {
	nickname: string
	balance: number
}
