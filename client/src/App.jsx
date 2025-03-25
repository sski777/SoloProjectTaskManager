import './index.css'
import HomePage from './HomePage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './NavBar'
import NotFound from './NotFound'
import TasksList from './TasksList'
import TaskId from './Taskid'
import PomodoroTimer from './Timer'
import AboutPage from './AboutPage'
import FavoriteTask from './Favorites'
function App() {



  return (
    <Router>
        <Navbar/>
       <Routes>
         <Route path='/' element={<HomePage/>}></Route>
         <Route path='/tasks' element={<TasksList/>}></Route>
         <Route path='/tasks/:id' element={<TaskId/>}></Route>
         <Route path='/timer' element={<PomodoroTimer/>}></Route>
         <Route path='/favorites' element={<FavoriteTask/>}></Route>
         <Route path='/about' element={<AboutPage/>}></Route>
         <Route path='*' element={<NotFound/>}></Route>
       </Routes>
    </Router>
  )
}

export default App
