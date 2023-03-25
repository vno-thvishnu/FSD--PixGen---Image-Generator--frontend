import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from "../assets/logotwo.png"

const NavBar = () => {
  // const[change,setChange]=useState(true)
  // useEffect(()=>{
  //   // const forName=()=>{
  //   console.log("llljo")
  //       setChange(true)
  //   // }
  //   },[])
  const navigate = useNavigate()

  return (
    <>
     <header className="w-full flex justify-between items-center bg-[#1b1c1e]
     text-white
  sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
<Link to="/">
  {/* <img src={logo} alt="logo" className='w-28 object-contain'/> */}
  <div className='flex   h-fit gap-1'>
                <div><img src={logo} className='imglogo'/></div>
                <div><h2 className='forhead'>PixGen</h2>
            <p className='forslo' > generate images using your own commands</p></div>
                </div>
</Link>

<h5 className='forlogout' onClick={()=>{navigate('/');localStorage.removeItem("username")}}>Logout</h5>


  </header>


  <main className='sm:p-8 px-4 py-4 w-full bg-[#1b1c1e] min-h-[calc(100vh-73px)]  text-white'>
    <Outlet/>
</main>
    </>
  )
}

export default NavBar