import React, { useEffect, useState } from 'react'
import { Loader,Card,FormField } from '../components'
import NavBar from './NavBar'
import { config } from '../constants/Config'
import { Link } from 'react-router-dom'


  const RenderCards =({data,title})=>{
    if(data?.length>0)
    {return data.map((post)=> <Card key={post._id}{...post}/>)
  }  
  return(
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
        {title}
    </h2>
  )
}

const Home = () => {

   

    const [loading,setLoading]=useState(false)
    const [allPost,setAllPost]=useState(null)

    const[searchText,setSearchText]=useState("")
    const[searchedResults,setSearchedResults]=useState(null)
const[searchTimeout,setSearchTimeout]=useState(null)
    useEffect(()=>{
    const fetchPosts = async()=>{
setLoading(true)
try {
    const response = await fetch(`${config.api}/api/v1/post`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
    })
    if(response.ok){
        const result = await response.json();
        setAllPost(result.data.reverse())
    }
} catch (error) {
    alert(error)
}finally{
    setLoading(false)
}

    }
    fetchPosts()
},[])


const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout)
    setSearchText(e.target.value);
setSearchTimeout(
    
    setTimeout(()=>{
        const searchResults=allPost.filter((item)=>item.name.toLowerCase()
        .includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes
        (searchText.toLowerCase()))

        setSearchedResults(searchResults)
    },500)
)
}


  return (
    <>
    {/* <NavBar/> */}
    <div className=' flex justify-center items-center  bg-[#1b1c1e] '>
  <Link to='/home/create-post'
// style={{transition:"width 1s"}}
 className='buttonfontsize  font-inter font-medium bg-[#6469ff]
 text-white px-4 py-1 rounded-md '>Create</Link></div>

<section className='max-w-7xl mx-auto'>
    <div>
        <h1 className='font-extrabold 
     text-white
        
        text-[32px]'>
            The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mx-w[500px]'>
            Browser through a collection of imaginative and visually stunning
            imgaes generated by OpenAI api
        </p>
    </div>
    <div className='mt-4'>
        <FormField
        labelName="Search posts"
        type="text"
        name="text"
        placeholder="Search posts"
        value={searchText}
        handleChange={handleSearchChange}
        />
    </div>
    <div className='mt-6'>
        {loading?(
            <div className='flex justify-center items-center'>
                <Loader/>
            </div>
        ):(
            <>
            {searchText && (
                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                    showing results for <span className='text-[#222328]'>{searchText}</span>
                </h2>
            )}
<div className='grid lg:grid-cols-4 sm:grid-cols-3
xs:grid-cols-2 grid-cols-1 gap-3'>
    {searchText?(
        <RenderCards
        data={searchedResults}
        title="No search results found"/>

    ):(
        <RenderCards
        data={allPost}
        title="No post found"/>
    )}

</div>

            </>
        )}
    </div>
</section>
{/* </main> */}
</>
    )
}

export default Home