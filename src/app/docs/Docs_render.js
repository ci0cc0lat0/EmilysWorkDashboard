'use client'
import { useEffect, useState } from "react"
import s from "./docs_render.module.css"

export default function Docs_render({sort_state}){
  const [data, set_data] = useState();

  useEffect(()=>{
    async function fetch_data(){
      const res  = await fetch(`/docs/api?sort=${sort_state}`)
      const api_data = await res.json()
      set_data(api_data)
  }
    fetch_data()
  },[sort_state])

 
  return (
    <>

      <div className={s.result_parent}>
       {data?.data?.data.map((item,index) => {
            return (
            
                <a  key={index} href={`/docs/${item.attributes.Title}`}>
                <div  className={s.result_item}>
                
                  <p>{item.attributes.Title}</p>
                </div>
                </a>
            )
            })}
      </div>
    </>
  )
}