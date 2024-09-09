'use client'
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import s from "./todolist.module.css"

function Load_lists(){
  const searchParams = useSearchParams();
  const [data, set_data] = useState();
  const [title_sort, set_title_sort] = useState(searchParams.get("sort") || 'asc');

  function handle_title_sort(){
    set_title_sort(title_sort === 'asc' ? 'desc' : 'asc')
  }


  // Checking for state changes
  useEffect(()=>{
    async function fetch_data(){
      const params = new URLSearchParams()
      if(title_sort) params.set('sort',title_sort)

      window.history.replaceState(null,'',`/todo-list?${params.toString()}`)

      const res  = await fetch(`/todo-list/api?${params.toString()}`)
      const data = await res.json()
      set_data(data)
    }
    fetch_data()
  },[title_sort])

  const columns = [
    {
      label: "Title",
      sortable: true,
      state: title_sort
    }
  ]
  return (
    <>
      <div className={s.display_results}>
        <table className={s.table_a}>
          <tbody className={s.table_tbody}>
            <tr>
              {columns.map((column)=>{
                let sortParam = ''
                if(column.sortable) sortParam = column.state
                return(
                  sortParam ? (
                    <th
                    className={s.table_header}
                    key={column.label} 
                    onClick={handle_title_sort}>
                      {column.label}
                    </th>) : (<th key={column.label}>{column.label}</th>)
                )
              })}
            </tr>
              {
                data?.data?.data.map((item,index)=>{
                  return (
                    <tr key={index}>
                      <td>
                        <a href={`/todo-list/${item.attributes.url_title}`}>
                        {item.attributes.url_title}
                        </a>
                      </td>
                    </tr>
                  )
                })
              }

          </tbody>
        </table>
      </div>
    </>
  )
}

export default function list_page(){
  

  return (
    <>
      <Suspense>
        <Load_lists/>
      </Suspense>
    </>
  )
}