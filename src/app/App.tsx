import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Providers } from "./providers"
import { AuthProvider } from "./auth/AuthProvider"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import { GuestRoute } from "./auth/GuestRoute"
import { Header } from "@/widgets/Header"
import { HomePage } from "@/pages/home/ui/HomePage"
import { HistoryPage } from "@/pages/history/ui/HistoryPage"
import { SearchDetailPage } from "@/pages/search-detail/ui/SearchDetailPage"
import { AiTestPage } from "@/pages/ai-test/ui/AiTestPage"
import { AuthPage } from "@/pages/auth/ui/AuthPage"
import { RegisterPage } from "@/pages/register/ui/RegisterPage"
import { ProfilePage } from "@/pages/profile/ui/ProfilePage"
import styles from "./App.module.scss"

export function App() {
	return (
		<Providers>
			<BrowserRouter>
				<AuthProvider>
					<div className={styles.layout}>
						<Header />
						<main className={styles.main}>
							<Routes>
								<Route path="/login" element={<GuestRoute><AuthPage /></GuestRoute>} />
								<Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
								<Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
								<Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
								<Route path="/search-detail" element={<ProtectedRoute><SearchDetailPage /></ProtectedRoute>} />
								<Route path="/ai-test" element={<ProtectedRoute><AiTestPage /></ProtectedRoute>} />
								<Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
							</Routes>
						</main>
					</div>
				</AuthProvider>
			</BrowserRouter>
		</Providers>
	)
}
