import { useState } from 'react'
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import Cards from './components/Cards'
import Search from './components/Search'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container-fluid'>      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/search" element={<Search/>}/>
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  )
}

export default App
