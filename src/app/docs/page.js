'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react";
import s from './docs.module.scss'
import r from "./docs_table.module.scss"
import nav from "@/app/components/style/doc_nav_button.module.scss"
import Filter_button from "../components/Filter_Button";
import Sort_toggle from "../components/Sort_toggle";
import Remove_button from "../components/Remove_filter";
import { jsx } from "react/jsx-runtime";
import Doc_Nav_button from "../components/Doc_Nav_button";

import { Poppins } from 'next/font/google'

const Poppins_font = Poppins({
  weight:['200','300','400','500','600','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
})

/**
 * Belongs to the render function
 * @param {*} date_string date string with time
 * @returns a date string without time
 */
function parse_time(date_string) {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const date = date_string.match(regex)[0];
  return date
}

/**
 * 
 * @param {*} {sort_state} The query parameter from the Content component.
 * @returns The rendered API infomation dependent on the state
 */
function Render() {
  const [data, set_data] = useState();
  const [enum_guys, set_enums] = useState();
  const [page_count, set_page_count] = useState();
  

  function handle_doc_type(filter_to_set) {
    if(filter_to_set === doc_type) set_doc_type()
    else{
      set_doc_type(filter_to_set)
    }
  }

  function handle_market(filter_to_set) {
    if(filter_to_set === market) set_market()
    else{
      set_market(filter_to_set)
    }
  }

  function handle_group(filter_to_set) {
    if(filter_to_set === group) set_group()
    else{
      set_group(filter_to_set)
    }
  }

  function handle_meeting(filter_to_set) {
    if(filter_to_set === meeting) set_meeting()
    else{
      set_meeting(filter_to_set)
    }
  }

  function handle_page(){
    if(page_num >= page_count) return
    set_page_num(page_num+1)

  }
  function handle_back_page(){
    if(page_num <= 1) return
    set_page_num(page_num-1)
  }

  // Loads enums for the dropdown buttons
  useEffect(() => {
    async function load_enums() {
      const enums = await fetch(`/docs/api/enums`)
      const enum_data = await enums.json()
      set_enums(enum_data)
    }
    load_enums()

  }, [])




  const searchParams = useSearchParams();
  const name_sortby = searchParams.get("sort") || 'a-z'

  const state_name = name_sortby === 'a-z' ? 'z-a' : 'a-z';
  const state_meeting = name_sortby === 'new' ? 'old' : 'new';
  const state_creation = name_sortby === 'asc' ? 'desc' : 'asc';


  const [doc_type, set_doc_type] = useState(searchParams.get('doc_type'));
  const [market, set_market] = useState(searchParams.get('market_type'));
  const [group, set_group] = useState(searchParams.get('group_type'));
  const [meeting, set_meeting] = useState(searchParams.get('meeting_type'));
  const [page_num, set_page_num] = useState(searchParams.get('page')||1);
  

  // Used to add query parameters for filters (DONT NEED??)
/*   useEffect(()=>{
    const params = new URLSearchParams()
    if(doc_type) params.set('doc_type',doc_type)
    if(market) params.set('market_type',market)
    if(group) params.set('group_type',group)
    if(meeting) params.set('meeting_type',meeting)

    if (name_sortby) {
      params.set('sort', name_sortby);
    } else if (state_meeting) {
      params.set('sort', state_meeting);
    } else if (state_creation) {
      params.set('sort', state_creation);
    }

    window.history.replaceState(null,'',`/docs?${params.toString()}`)
    },[doc_type,market,group,meeting,name_sortby]) */

  // Used to fetch from the API dependent on the sorts and filters
  useEffect(()=>{
    async function fetch_data2(){
      const params = new URLSearchParams();
      if (doc_type) params.set('doc_type', doc_type);
      if (market) params.set('market_type', market);
      if (group) params.set('group_type', group);
      if (meeting) params.set('meeting_type', meeting);
      if (name_sortby) params.set('sort', name_sortby);
      if (page_num) params.set('page',page_num)
      window.history.replaceState(null,'',`/docs?${params.toString()}`)

      const res = await fetch (`/docs/api/maindocs?${params.toString()}`)
      const api_data = await res.json()
      set_data(api_data)
      set_page_count(api_data?.data.meta.pagination.pageCount)
    }
    fetch_data2()
  },[doc_type, market, group, meeting, name_sortby,page_num])
  const columns = [
    {
      key: "Market",
      label: "Market"
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "Group",
      label: "Group"
    },
    {
      key: "Document_Type",
      label: "Doc Type"
    },
    {
      key: "Meeting",
      label: "Meeting"
    },
    {
      key: "Meeting_Date",
      label: "Meeting Date"
    }
  ]


  function clear_doctype(){
    set_doc_type()
  }
  function clear_market(){
    set_market()
  }
  function clear_group(){
    set_group()
  }
  function clear_meeting(){
    set_meeting()
  }
  

  return (
    <>
      <div className={`${s.page_wrapper} ${Poppins_font.variable}`}>
        <div className={s.sortandfilter_wrapper}>
          
          <div className={s.sortandfilter}>
            
           
            <Filter_button
            state_func={handle_market}
            array_of_enums={enum_guys?.data?.market_enums} 
            filter_name={"Market"}/>
            <Filter_button state_func={handle_group}
            array_of_enums={enum_guys?.data?.group_enums}
            filter_name={"Group"}/>
             <Filter_button
            state_func={handle_doc_type} 
            array_of_enums={enum_guys?.data?.doc_type_enums}
            filter_name={"Document Type"}/>
            <Filter_button
            state_func={handle_meeting}
            array_of_enums={enum_guys?.data?.meeting_enums}
            filter_name={"Meeting"}/>

<button className={s.remove_wrapper_button}  onClick={()=>{
              clear_doctype()
              clear_market()
              clear_group()
              clear_meeting()
            }}>Clear filters</button>
          </div>
        
        
        <div className={s.remove_wrapper}>
        
          <div className={s.remove_container}>
            
            <h1>Filtering by: </h1> 
            <Remove_button state={market} state_func={clear_market}/>
            <Remove_button state={group} state_func={clear_group}/>
            <Remove_button state={doc_type} state_func={clear_doctype}/>
            <Remove_button state={meeting} state_func={clear_meeting}/>
            
          </div>
        </div>

        </div >
        <div className={s.display_results}>
          <table className={r.table_a}>
            <tbody className={r.table_tbody}>
              <tr >
                {columns.map((column) => {
                  let params = new URLSearchParams();
                  if(doc_type) params.set('doc_type',doc_type)
                  if(market) params.set('market_type',market)
                  if(group) params.set('group_type',group)
                  if(meeting) params.set('meeting_type',meeting)

                  let sortParam = ''
                  if(column.key === "title") sortParam = state_name;
                  else if(column.key === "Meeting_Date") sortParam = state_meeting;

                  if (sortParam) params.set('sort',sortParam)
                  
                  
                  return(
                    <th key={column.key}>
                      {sortParam ? (
                        <Link className={r.linker} href={`/docs?${params.toString()}`}>
                          {column.label}
                        </Link>) : (column.label)
                       
                      
                      }
                    </th>
                  )
                })}
              </tr>

              
              {data?.data?.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.attributes.market || <i>null</i>}</td>
                    <td>
                      <a href={`/docs/${item.attributes.title}`}>
                        {item.attributes.title}
                      </a>
                    </td>
                    <td>{item.attributes.group || <i>null</i>}</td>
                    <td>{item.attributes.doc_type || <i>null</i>}</td>
                    <td>{item.attributes.meeting || <i>null</i>}</td>
                    <td>{item.attributes.meeting_date || <i>null</i>}</td>

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

        <div className={nav.page_nav_container}>
          <Doc_Nav_button
          classNameDiv={nav.page_nav_div}
          classNameButton={nav.page_nav_button}
          func={handle_back_page}>
            Previous page
          </Doc_Nav_button>

          <Doc_Nav_button
          classNameDiv={nav.page_nav_div}
          classNameButton={nav.page_nav_button}
          func={handle_page}>
            Next page
          </Doc_Nav_button>

        

        </div>
        

      </div>
    </>
  )
}

/**
 * Holds the buttons and other non rendered API stuff. 
 * @returns Returns the functional buttons(really links) and the rendered API data.
 */
function Content() {
  
  return (
    <>
      <Render />
    </>
  )
}

export default function test() {

  return (
    <Suspense>
      <Content />
    </Suspense>

  )
}