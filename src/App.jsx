import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import WasteManagementPage from './pages/WasteManagementPage.jsx'
import KnowledgePage from './pages/KnowledgePage.jsx'
import QuizPage from './pages/QuizPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ChecklistPage from './pages/ChecklistPage.jsx'
import BuildingPage from './pages/BuildingPage.jsx'

export default function App() {
  return (
    <BrowserRouter basename="/go451">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="waste-management" element={<WasteManagementPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="building" element={<BuildingPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
