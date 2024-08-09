'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";
import Server_guy from "./Docs_render";
import s from './docs.module.css'


function Content(){
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sort") || 'asc'
  const toggle_sort = sortby === 'asc' ? 'desc' : 'asc'; 

    return (
      <div className={s.page_wrapper}>
        <div className={s.main_wrapper}>
          <div className={s.sortandfilter}>

            <div className={s.sortandfilter_item}>
            <Link href={`/docs?sort=${toggle_sort}`} className={s.the_link}>
              Sorting by {sortby}
            </Link>
            </div>

            <div className={s.sortandfilter_item}>
            <Link href={"#"} className={s.the_link}>
              Sorting by {sortby}
            </Link>
            </div>
            <div className={s.sortandfilter_item}>
            <Link href={"#"} className={s.the_link}>
              Sorting by {sortby}
            </Link>
            </div>

            <div className={s.sortandfilter_item}>
            <Link href={"#"} className={s.the_link}>
              Sorting by {sortby}
            </Link>
            </div>

          </div >
          
          </div>

          <div className={s.display_results}>
              <Server_guy sort_state={toggle_sort}/>
            </div>
      </div>
    )
}

export default function test(){
  
  return(
    <Suspense>
      <Content/>
    </Suspense>
    
  )
}