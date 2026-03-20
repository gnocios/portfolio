import './App.css'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Contact from './components/Contact'

function App() {

  return (
    <>
      <Navbar />


      <div className="container">
        <About />
        <section id="spacer"></section>
        
        <Skills />
        <section id="spacer"></section>
        
        <Experience />
        <section id="spacer"></section>
        
        <Projects />
        <section id="spacer"></section>
        
        <Resume />
        <section id="spacer"></section>
        
        <Contact />
      </div>


    </>
  )
}

export default App
