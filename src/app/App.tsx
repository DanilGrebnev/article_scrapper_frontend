import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Providers } from "./providers"
import { Header } from "@/widgets/Header"
import { HomePage } from "@/pages/home/ui/HomePage"
import { HistoryPage } from "@/pages/history/ui/HistoryPage"
import { SearchDetailPage } from "@/pages/search-detail/ui/SearchDetailPage"
import { AiTestPage } from "@/pages/ai-test/ui/AiTestPage"
import styles from "./App.module.scss"

export function App() {
	return (
		<Providers>
			<BrowserRouter>
				<div className={styles.layout}>
					<Header />
					<main className={styles.main}>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/history" element={<HistoryPage />} />
							<Route path="/search-detail" element={<SearchDetailPage />} />
						<Route path="/ai-test" element={<AiTestPage />} />
						</Routes>
					</main>
				</div>
			</BrowserRouter>
		</Providers>
	)
}
