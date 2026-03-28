import './App.css'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Resume from './components/Resume/Resume'
import Contact from './components/Contact/Contact'
import Academic from './components/Academic/Academic'
import Rpsls from "./games/rpsls/Rpsls";
import Sillas from "./games/sillas/Sillas";
import Rememora from './games/rememora/Rememora'
import Slfmk from './games/slfmk/Slfmk'

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
        <section id="spacer"></section>

        <Academic />
        <section id="spacer"></section>

        <Rpsls />
        <section id="spacer"></section>

        <Sillas />
        <section id="spacer"></section>

        <Rememora />
        <section id="spacer"></section>

        <Slfmk />
        <section id="spacer"></section>

      </div>


    </>
  )
}

export default App
