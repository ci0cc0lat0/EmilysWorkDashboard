'use client'
import { useEffect, useState } from "react"

export default function Docs_render({sort_state}){
  const [data, set_data] = useState();

  useEffect(()=>{
    async function fetch_data(){
      const res  = await fetch(`/todo-list/api?sort=${sort_state}`)
      const api_data = await res.json()
      set_data(api_data)
  }
    fetch_data()
  },[sort_state])

 
  return (
    <>

      <div>
       {data?.data?.data.map((item,index) => {
            return (
            
                <a  key={index} href={`/docs/${item.attributes.Title}`}>
                <div >
                
                  <p>{item.attributes.url_title}</p>
                </div>
                </a>
            )
            })}
      </div>
    </>
  )
}