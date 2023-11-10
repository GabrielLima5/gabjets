import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Fleet from './pages/Fleet/Fleet'
import Buy from './pages/Buy/Buy'
import About from './pages/About/About'
import AircraftInfo from './pages/AircraftInfo/AircraftInfo'
import Contact from './pages/Contact/Contact'
import Modal from './components/Modal/Modal';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation'
import { ModalProvider } from './context/ModalContext'
import { OrderProvider } from './context/OrderContext'
import { AircraftProvider } from './context/AircraftContext';
import Search from './pages/Search/Search';

function App() {

  return (
    <div className="App">
      <AircraftProvider>
        <ModalProvider>
          <OrderProvider>
            <BrowserRouter>
              <Header />
              <Modal />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/fleet/:company" element={<Fleet />} />
                <Route path="/search" element={<Search />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/about" element={<About />} />
                <Route path="/aircraft/:id" element={<AircraftInfo />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </OrderProvider>
        </ModalProvider>
      </AircraftProvider>
    </div>
  );
}

export default App;
