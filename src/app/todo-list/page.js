'use client'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import List_render from "./List_render"

function Load_lists(){
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sort") || 'asc'
  const toggle_sort = sortby === 'asc' ? 'desc' : 'asc'; 
  return (
    <>
      <Link href={`/todo-list?sort=${toggle_sort}`}>
            Sorting by {sortby}
      </Link>
      <List_render sort_state={toggle_sort}/>
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