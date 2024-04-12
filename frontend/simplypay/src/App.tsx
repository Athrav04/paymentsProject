
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './components/HomePage'
import SingIn from './components/singIn'
import SignUp from './components/singUp'
import Send from './components/send'
import Dashboard from './components/dashboard'
import ErrorPage from './components/ErrorPage'
import SuccessMsg from './components/SuccessMsg'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>} />
	    <Route path='/SignIn' element={<SingIn/>} />
      <Route path='/SignUp' element={<SignUp/>} />
      <Route path='/Send' element={<Send/>} />
      <Route path='/Dashboard' element={<Dashboard/>} />
      <Route path='/AfterMsg' element={<SuccessMsg/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
    </>
  )
}

export default App
