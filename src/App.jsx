import { HashRouter as Router, Routes, Route } from "react-router"
import './assets/css/index.css'
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { ToyEdit } from "./pages/ToyEdit"
import { ToyIndex } from "./pages/ToyIndex"
import { ToyDetails } from "./pages/ToyDetails"
import { UserMsg } from "./cmps/UserMsg"

function App() {

  return (
    <Router>
      <section className="app-container">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/toy" element={<ToyIndex />}>
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            </Route>
            <Route path="toy/:toyId" element={<ToyDetails />} />
          </Routes>
        </main>
        <AppFooter />
        <UserMsg />
      </section>
    </Router>
  )
}

export default App
