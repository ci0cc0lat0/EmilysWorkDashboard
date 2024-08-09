import { NextResponse } from "next/server"

const cache = new Map()

export async function GET(req){
    const searchParams = req.nextUrl.searchParams
    const sort = searchParams.get('sort')

    let api_url = `http://${process.env.API_IP}:1339/api/docx-tests?sort=createdAt:${sort}`

    if(cache.has(api_url)){
        console.log("from cache")
        return Response.json(cache.get(api_url))
    }
    
    try{
        const resp = await fetch(api_url)
        const data = await resp.json()
    
        cache.set(api_url,{data})
        //console.log("I have cached",api_url,{data})
    const response = Response.json({data})
    response.headers.set('Cache-Control','s-maxage=3600, stale-while-revalidate=60')
    return response
    }
    catch(e){
        return Response.json({error:`I am the error${e}`})
    }
        
    
    /* if(sort === 'old'){
        console.log("I am old")
        api_url = `http://${process.env.API_IP}:1339/api/docx-tests?sort=createdAt:asc`
    } 
    else if(sort === 'new'){
        console.log("I am new")
        api_url = `http://${process.env.API_IP}:1339/api/docx-tests?sort=createdAt:desc`
    }    */     
}