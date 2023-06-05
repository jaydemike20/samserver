import { Route, Routes } from "react-router-dom"
import Login from "./login/index.js"
import './App.css'
import Navbar from "./Navbar"
import Home from "./pages/home.js"
import History from "./pages/history.js"
import Search from "./pages/search.js"
import Profiles from "./pages/profile.js"
import ActivationPage from "./pages/activationpage.js"
import ResetPage from './pages/resetPassword.js'

function RouterPage() {
  return (
      <div>
        <Navbar></Navbar>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="activation/:uid/:token" element={<ActivationPage />} />
            <Route path="/reset_password/:uid/:token" element={<ResetPage />} />
          </Routes>
      </div>

  )
}

export default RouterPage