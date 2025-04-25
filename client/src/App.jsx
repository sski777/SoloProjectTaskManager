import './index.css'
import HomePage from './HomePage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './NavBar'
import NotFound from './NotFound'
import TasksList from './TasksList'//change
import TaskId from './Taskid'
import PomodoroTimer from './Timer'
import AboutPage from './AboutPage'
import FavoriteTask from './Favorites'
import TaskCategory from './TaskCategory'
import UserProfile from './UserProfile'
import ProtectedRoute from './ProtectedRoute'
import HiddenPage from './HiddenPage'
import LoginPrompt from './AuthenticatePrompt'
import EmailCapture from './SubmitEmail'
function App() {



  return (
    <Router>
        <Navbar/>
       <Routes>
         <Route path='/' element={<HomePage/>}></Route>
         <Route path='/tasks' element={<ProtectedRoute><TasksList/></ProtectedRoute>}></Route>
         <Route path='/tasks/:id' element={<ProtectedRoute><TaskId/></ProtectedRoute>}></Route>
         <Route path='/timer' element={<ProtectedRoute><PomodoroTimer/></ProtectedRoute>}></Route>
         <Route path='/favorites' element={<ProtectedRoute><FavoriteTask/></ProtectedRoute>}></Route>
         <Route path='/category' element={<ProtectedRoute><TaskCategory/></ProtectedRoute>}></Route>
         <Route path='/profile' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}></Route>
         <Route path='/hidden' element={<ProtectedRoute><HiddenPage/></ProtectedRoute>}></Route>
         <Route path='/email' element={<EmailCapture/>}></Route>
         <Route path='/about' element={<AboutPage/>}></Route>
         <Route path='/authenticate' element={<LoginPrompt/>}></Route>
         <Route path='*' element={<NotFound/>}></Route>
       </Routes>
    </Router>
  )
}

export default App
