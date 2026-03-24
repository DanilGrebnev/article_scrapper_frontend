const JOB_ID_KEY = "article_search_job_id"

export function getJobId(): string | null {
	return localStorage.getItem(JOB_ID_KEY)
}

export function setJobId(id: string): void {
	localStorage.setItem(JOB_ID_KEY, id)
}

export function clearJobId(): void {
	localStorage.removeItem(JOB_ID_KEY)
}
