import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Providers } from "./providers"
import { Header } from "@/widgets/Header"
import { HomePage } from "@/pages/home/ui/HomePage"
import { HistoryPage } from "@/pages/history/ui/HistoryPage"

export function App() {
	return (
		<Providers>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/history" element={<HistoryPage />} />
				</Routes>
			</BrowserRouter>
		</Providers>
	)
}
