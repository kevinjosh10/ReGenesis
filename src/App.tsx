import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/LandingPage"
import { CommandCenter } from "./pages/CommandCenter"
import { OpportunityEngine } from "./pages/OpportunityEngine"
import { ResourceComposer } from "./pages/ResourceComposer"
import { VentureStudio } from "./pages/VentureStudio"
import { ResourceIntelligence } from "./pages/ResourceIntelligence"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<CommandCenter />} />
        <Route path="/opportunities" element={<OpportunityEngine />} />
        <Route path="/composer" element={<ResourceComposer />} />
        <Route path="/studio" element={<VentureStudio />} />
        <Route path="/studio/:id" element={<VentureStudio />} />
        <Route path="/intelligence" element={<ResourceIntelligence />} />
      </Routes>
    </BrowserRouter>
  )
}
