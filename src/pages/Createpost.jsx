import React, { useEffect, useState } from 'react'

import { preview } from '../assets'
import {getRandomPrompt} from '../utils'

import { FormField,Loader } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../constants/Config'
import LoaderSmall from '../components/LoaderSamall'
import NavBar from './NavBar'

const Createpost = () => {

    const navigate =useNavigate()
    const[saveName,setSaveName]=useState(null)

useEffect(()=>{
// const forName=()=>{
    const forName=localStorage.getItem("username")

    setSaveName(forName)
// }
},[])
    const[form,setForm]=useState({
        name:"",
        prompt:"",
        photo:"",
    })
    const [generatingImg,setGeneratingImg]=useState(false)
    const [loading,setloading]=useState(false)
const generatingImage=async()=>{
if(form.prompt){
    try {
        setGeneratingImg(true)
        const response = await fetch(`${config.api}/api/v1/dalle`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({prompt: form.prompt}),
        })

        const data=await response.json();

        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
    } catch (error) {
        alert(error)
    }finally{
        setGeneratingImg(false)
    }
}else{
    alert(`please enter a prompt`)
}
}

const handleSubmit = async(e)=>{
 e.preventDefault();

if(form.prompt && form.photo){
    form.name=saveName
    setloading(true)

    try {
        const response = await fetch(`${config.api}/api/v1/post`,{
            method:'POST',
            headers:{
             'Content-Type':'application/json',
            },
            body:JSON.stringify(form)
    })

    await response.json();

} catch (error) {
        alert(error)
    }finally{
        setloading(false)
    navigate('/home')

    }
}else{
    alert('Please enter a prompt and generate an image')
}

}


const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}
const handleSurpriseMe=()=>{
    const randomPrompt=getRandomPrompt(form.prompt)
    setForm({...form,prompt:randomPrompt})
}



  return (
    <>
    {/* <NavBar/> */}
  {/* <main className='sm:p-8 px-4 py-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'> */}
  <div className=' flex justify-center items-center  bg-[#1b1c1e] '>
  <Link to='/home'
// style={{transition:"width 1s"}}
 className='buttonfontsize  font-inter font-medium bg-[#6469ff]
 text-white px-4 py-1 rounded-md '>Community</Link></div>
<section className='max-w-7xl mx-auto'>
<div>
        <h1 className='font-extrabold 
     text-white
        
        text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mx-w[500px]'>
           Create imaginative and visually stunning
            imgaes through OpenAI api and share them with the community
        </p>
    </div>
    <form className='mt-4 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
            <FormField 
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Your Name"
            // value={form.name}
            value={saveName}
            handleChange={handleChange}
            />
               <FormField 
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative  bg-gray-50 border border-gray-300
            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
            w-64 p-3 h-64 flex justify-center items-center'>
                {form.photo?(
                    <img src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"/>


                ):(
                    <img src={preview}
                    alt="preview"
                    className='w-9/12 h-9/12 object-contain  opacity-40'/>
                   
                )}
                {generatingImg &&(
                    <div className='absolute inset-0 z-0 flex justify-center items-center
                    bg-[rgba(0,0,0,0.5)] rounded-lg'>
                        <Loader/>
                    </div>
                )}

            </div>
        </div>
        <div className='mt-5 flex gap-5'>
            <button type='button' onClick={generatingImage}
            className="text-white bg-green-700 font-medium rounded-md
            text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                {generatingImg? 'Generating...':'Generate'}
            </button>

        </div>
        <div className='mt-6'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
                Once you have created the image you want, you can share it with
                others in the community
            </p>
            <button
                type="submit"
            className='flex gap-2 mt-3 text-white bg-[#6469ff] font-medium rounded-md
            text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >{
                loading? <>Sharing... <LoaderSmall/> </>:'Share with the community'
            }
            </button>
        </div>
    </form>
</section>
{/* </main> */}
</>
    )
}

export default Createpost