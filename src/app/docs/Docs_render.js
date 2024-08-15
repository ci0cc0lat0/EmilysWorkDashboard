'use client'
import { useEffect, useState } from "react"
import s from "./docs_render.module.css"

function parse_time(date_string){
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const date = date_string.match(regex)[0];
  return date
}

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

   const columns = [
    {
      key:"Title",
      label:"Title"
    },
    {
      key:"Document_Type",
      label:"Doc Type"
    },
    {
      key:"Market",
      label:"Market"
    },
    {
      key:"Group",
      label:"Group"
    },
    {
      key:"Meeting",
      label:"Meeting"
    },
    {
      key:"Meeting_Date",
      label:"Meeting Date"
    },
    {
      key:"creation_time",
      label:"Creation Time"
    }
  ]
  
  
  return (
    <>
      <table className={s.table_a}>
        <tbody className={s.table_tbody}>
        <tr >
        {columns.map((column)=>
          <th className="table_header_b" key={column.key}>{column.label}</th>)}
        </tr>
        
        {data?.data?.data.map((item,index)=>{
          return(
          <tr key={index}>
            <td>
              <a href={`/docs/${item.attributes.Title}`}>
                {item.attributes.Title}
              </a>
            </td>
            <td>{item.attributes.Document_Type ||'null'}</td>
            <td>{item.attributes.Market || 'null'}</td>
            <td>{item.attributes.Group || 'null'}</td>
            <td>{item.attributes.Meeting || 'null'}</td>
            <td>{item.attributes.Meeting_Date ||'null'}</td>
            <td>{parse_time(item.attributes.createdAt) || 'null'}</td>
            
          </tr>
          )
        })}

        </tbody>
      </table>

       {/* <div className={s.result_parent}>
       {data?.data?.data.map((item,index) => {
            return (
                
                <a  key={index} href={`/docs/${item.attributes.Title}`}>
                <div  className={s.result_item}>

                  <p>{item.attributes.Title}</p>
                  <p>{item.attributes.Market}</p>
                  <p>{item.attributes.Group}</p>
                  <p>{item.attributes.Meeting}</p>
                  <p>{item.attributes['Document_Type']}</p>

                </div>
                </a>
            )
            })}
      </div> */}
    </>
  )
}