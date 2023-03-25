import React, { useState } from 'react'
import {logo} from './assets'
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import { Home,Createpost } from './pages'
import Auth from './pages/Auth'
import NavBar from './pages/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
// import './App.css'


const App = () => {


  return (
  <BrowserRouter>
 
  <Routes>
  <Route path='/' element={<Auth/>}>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
  </Route>

   <Route path='/home' element={<NavBar/>}>
   <Route path='/home' element={<Home/>}/>
    <Route path='/home/create-post' element={<Createpost/>}/>
   </Route>
  </Routes>
  {/* </main> */}
  </BrowserRouter>
  )
}

export default App