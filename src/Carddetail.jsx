import React from 'react'
import { useParams } from 'react-router-dom'
import { Blogs } from './Data/Blogs.js'

export default function Carddetail() {
  const id = useParams().id
   const Blogsdetail = Blogs.filter((item)=>item.id == id)[0]
    console.log(id)


  return (
    <>
    <h1>{Blogsdetail ? Blogsdetail.title : ''}</h1>
      
    </>
  )

}
