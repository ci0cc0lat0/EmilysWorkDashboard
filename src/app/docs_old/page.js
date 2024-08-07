'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const default_link = `http://${process.env.API_IP}:1339/API/docx-tests?sort=createdAt:DESC`

export default function docs() { 
  const [api_data, set_api_data] = useState(null)
  const [sort, set_sort] = useState("ASC")
  console.log(sort)
  function change_sort(){

    set_sort(sort === "ASC" ? "DESC" : "ASC")
    fetch_data() // add a query as a parameter
  }

  async function fetch_data(){
    const response = await fetch(`/docs/api?sort=${sort}`)
    const result = await response.json()
    set_api_data(result)
  }
  useEffect(()=>{
    async function fetch_data(){
      const response = await fetch(`/docs/api?sort=${sort}`)
      const result = await response.json()
      set_api_data(result)
    }
    fetch_data()

  },[])

  return (
    <>
        <h1>Docs Home page</h1>
        <button onClick={change_sort}>wtf :{sort}</button>

        {api_data?.data?.data.map((item,index) => {
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
