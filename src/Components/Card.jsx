import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({v,i}) {
  return (
    <>
    <div className="card" >
        <div className="card-body">
            <h5>{v.title}</h5>
            <p>{v.body}</p>
           <Link to={`/carddetail/${v.id}`} >Show Detail</Link>

        </div>
    </div>

    





    </>
  )
}
