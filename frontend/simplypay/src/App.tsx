
import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SingIn from './pages/singIn'
import SignUp from './pages/singUp'
import Send from './pages/send'
import Dashboard from './pages/dashboard'
import ErrorPage from './components/ErrorPage'
import SuccessMsg from './pages/SuccessMsg'
import Transactions from './pages/Transactions'


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
      <Route path='/Transactions' element={<Transactions/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
    </>
  )
}

export default App
