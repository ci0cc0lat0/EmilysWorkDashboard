'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Server_guy from "./ServerGuy";

function Content(){
  const searchParams = useSearchParams();
  const sortby = searchParams.get("sort") || 'asc' // state from url
  const toggle_sort = sortby === 'asc' ? 'desc' : 'asc'; 

    return (
      <>
      <Link href={`/test?sort=${toggle_sort}`}>
        Sorting by {sortby}
      </Link>
        <Server_guy sort_state={toggle_sort}/>
      </>
    )
}

export default function test(){
  
  return(
    <Suspense>
      <Content/>
    </Suspense>
    
  )
}