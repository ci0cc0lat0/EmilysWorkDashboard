'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";


export default function server_guy({sort_state}){
  const [data, set_data] = useState();

  useEffect(()=>{
    async function fetch_data(){
      const res  = await fetch(`/docs/api?sort=${sort_state}`)
      const api_data = await res.json()
      set_data(api_data)
  }
    console.log("I am active")
    fetch_data()
  },[sort_state])

 
  return (
    <>

       {data?.data?.data.map((item,index) => {
            return (
            <p key={index}>
                <a href={`/docs/${item.attributes.Title}`}>
                {item.attributes.Title}
                </a>
            </p>)
            })}
    </>
  )
}