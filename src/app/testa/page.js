'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function tests({initialPosts}){
    const router = useRouter();
    const {sort: initial_sort} = router.query

    const [posts, set_posts] = useState(initial_post)
    const [sort, set_sort] = useState(initial_sort || 'asc')

    useEffect(()=>{
        async function fetch_posts(){
            const response = await fetch(`/test/api?sort=${sort}`)
            const data = await response.json()
            set_posts(data)
        };
        fetch_posts();
    },[sort])

    function update_url(params){
        router.push({
            pathname: router.pathname,
            query: {...router.query, ...params}
        }, undefined, {shallow:true});
    };

    function change_sort(e){
        const new_sort = e.target.value
        set_sort(new_sort)
        update_url({sort:new_sort}

        )
    }

    return(
        <>
            <select value={sort} onChange={change_sort}>
                <option value="asc">Oldest</option>
                <option value="desc">Newest</option>
            </select>
        </>
    )
}