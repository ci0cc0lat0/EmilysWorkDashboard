'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function docs(){
    const [sort, set_sort] = useState('asc'); // initial state
    const [data, set_data] = useState();

    const router = useRouter();
    const searchParams = useSearchParams();
    const sortby = searchParams.get("sort") // state from url

    // change sort state
    useEffect(()=>{
        if(sortby){
            set_sort(sortby)
        }
    },[sortby])

    async function fetch_data(){
        const res  = await fetch(`/docs/api?sort=${sort}`)
        const api_data = await res.json()
        set_data(api_data)

    }

    // on sort change, fetch & change route
    useEffect(()=>{
        fetch_data()
        router.push(
            `?sort=${sort}`
        )
    },[sort])

    return (
        <>
            <button onClick={()=>{
                set_sort(
                sort === "asc" ? 'desc' : "asc"
            )}}>Sort by {sort} first</button>
            
            {/* JSON.stringify(data) */}
            
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