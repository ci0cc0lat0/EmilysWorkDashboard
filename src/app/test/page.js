'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ServerGuy from './ServerGuy'



export default function test(){
  const [data, set_data] = useState({})
  const [sort, set_sort] = useState('asc')

  return(
    <>
      <button onClick={()=>{
        // see if this can be dont with a LINK href guy later
        set_sort(sort === 'asc' ? 'desc' : 'asc')
      }}>I am on {sort}</button>
      <Suspense>
        <ServerGuy data_func={set_data} data_api={data} sort_state={sort} sort_func={set_sort}/>
      </Suspense>
    </>
  )
}

/*

This works on client
const [data, set_data] = useState()

  useEffect(()=>{
    async function load(){
      const res = await fetch(`http://craftmachine:1339/api/docx-tests`)
      const data = await res.json()
      set_data(data)
    }
    
    load()
  },[])

*/