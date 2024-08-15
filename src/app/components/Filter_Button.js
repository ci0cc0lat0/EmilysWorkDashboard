import s from "@/app/components/style/filter_button.module.css"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Filter_button({array_of_enums,state_func,filter_name}){
  const [style, set_style] = useState(s.dd_option_hidden)
  const dd_ref = useRef(null)
  function handle_filter(filter_for_parent){
    state_func(filter_for_parent)
  }

  function on_click(){
    set_style(style === s.dd_option_show ? s.dd_option_hidden : s.dd_option_show)
  }
  function on_item_click(){
    set_style(s.dd_option_hidden)
  }

  useEffect(()=>{
    function handle_outside_click(e){
      if(dd_ref.current && !dd_ref.current.contains(e.target)){
        set_style(s.dd_option_hidden)
      }

    }
    document.addEventListener('mousedown',handle_outside_click);

    return()=>{
    document.removeEventListener('mousedown',handle_outside_click);
    }
  },[dd_ref])

  if(!array_of_enums) return (
    <div>
      <button>Loading content</button>
    </div>
  )

  return (
    <div className={s.dd} ref={dd_ref}>
      <button className={s.dd_button} onClick={on_click}>{filter_name}</button>
      <div className={`${s.dd_options} ${style}`}>

        {array_of_enums.map((item,key)=> {
          return (
            <a className={s.dd_items} key={key} onClick={()=>{
              on_item_click()
              handle_filter(item)}}>{item}</a>
          )
        })}
      </div>
    </div>
  )
}