
import './App.css'
import AboutMe from './components/public/AboutMe'
import AllClasses from './components/public/AllClasses'
import ContactMe from './components/public/ContactMe'
import Footer from './components/public/Footer'
import HeroSection from './components/public/HeroSection'
import MyVision from './components/public/MyVision'
import Navbar from './components/public/Navbar'
import TotalStudent from './components/public/TotalStudent'

function App() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutMe />
      <AllClasses />
      <TotalStudent />
      <MyVision />
      <ContactMe />
      <Footer />
    </>
  )
}

export default App
