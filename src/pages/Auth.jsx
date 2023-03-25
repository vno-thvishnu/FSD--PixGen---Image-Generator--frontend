import React from 'react'
import { Outlet } from 'react-router-dom'
// import '../App.css'
import logo from "../assets/logotwo.png"
import videobg from '../assets/videoearth.mp4'
// import videobg from '../assets/video.mp4'


const Auth = () => {
  return (
    <div className='min-w-full min-h-screen bg-black' >
        <video src={videobg} autoPlay muted loop />
        {/* <h1>hloooo</h1> */}
        <div className='absolute min-h-full min-w-full top-0 flex flex-col  text-white'>
            <div className='flex   h-[15vh] gap-1 pt-[1rem] pl-[1rem]'>
                <div><img src={logo} className='imglogo'/></div>
                <div><h2 className='forhead'>PixGen</h2>
            <p className='forslo' > generate images using your own commands</p></div>
                </div>
            <div className='w-full h-[85vh] flex justify-center items-center flex-col'>
               <Outlet/>

            </div>
        </div>
    </div>
  )
}

export default Auth