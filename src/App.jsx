import './App.css'
import React from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Todo from './pages/Todo.jsx'
import Auth from './pages/Auth.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/todo' element={<Todo />} />
    </Routes>

    </BrowserRouter>

  )
}

export default App
