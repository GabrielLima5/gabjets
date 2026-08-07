import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Fleet from './pages/Fleet/Fleet'
import Buy from './pages/Buy/Buy'
import About from './pages/About/About'
import AircraftInfo from './pages/AircraftInfo/AircraftInfo'
import Modal from './components/Modal/Modal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import CustomCursor from './components/CustomCursor/CustomCursor'
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'
import { ModalProvider } from './context/ModalContext'
import { OrderProvider } from './context/OrderContext'
import { AircraftProvider } from './context/AircraftContext';
import Search from './pages/Search/Search';

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="page-transition" {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/fleet/:company" element={<Fleet />} />
          <Route path="/search" element={<Search />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/about" element={<About />} />
          <Route path="/aircraft/:id" element={<AircraftInfo />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AircraftProvider>
        <ModalProvider>
          <OrderProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="noise-overlay" aria-hidden="true" />
              <ScrollProgress />
              <CustomCursor />
              <div className="app">
                <Header />
                <Modal />
                <main className="app-content">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </OrderProvider>
        </ModalProvider>
      </AircraftProvider>
    </MotionConfig>
  );
}

export default App;
