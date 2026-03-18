import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AIMLJourney from './pages/AIMLJourney'
import NotFound from './pages/NotFound'
import useDarkMode from './hooks/useDarkMode'

function PageTransition({ children }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {children}
    </Motion.div>
  )
}

function App() {
  const location = useLocation()
  const [theme, toggleTheme] = useDarkMode()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home theme={theme} onToggleTheme={toggleTheme} />
            </PageTransition>
          }
        />
        <Route
          path="/aiml-journey"
          element={
            <PageTransition>
              <AIMLJourney />
            </PageTransition>
          }
        />
       
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default App
