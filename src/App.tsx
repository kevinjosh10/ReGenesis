import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { CommandCenter } from "./pages/CommandCenter"
import { OpportunityEngine } from "./pages/OpportunityEngine"
import { ResourceComposer } from "./pages/ResourceComposer"

import { ResourceIntelligence } from "./pages/ResourceIntelligence"
import { ExecutiveReport } from "./pages/ExecutiveReport"
import { DemoControls } from "./components/ui/DemoControls"
import { IntroSplash } from "./components/ui/IntroSplash"

import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="regenesis-theme">
      <IntroSplash />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<CommandCenter />} />
          <Route path="/opportunities" element={<OpportunityEngine />} />
          <Route path="/composer" element={<ResourceComposer />} />

          <Route path="/intelligence" element={<ResourceIntelligence />} />
          <Route path="/report" element={<ExecutiveReport />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
        <DemoControls />
      </Router>
      <Toaster position="bottom-right" richColors />
    </ThemeProvider>
  )
}
