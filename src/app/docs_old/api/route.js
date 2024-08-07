import { NextResponse } from "next/server"
export async function GET(request){
    const {searchParams} = new URL(request.url)
    const sort = searchParams.get('sort') 
    let api_url

    if( sort === 'ASC'){
        api_url = `http://${process.env.API_IP}:1339/API/docx-tests?sort=createdAt:ASC`
    }
    else if ( sort === 'DESC'){
        api_url = `http://${process.env.API_IP}:1339/API/docx-tests?sort=createdAt:DESC`
    }
    else{
        return Response.json({message: 'Invalid sort parameter'}, {status: 400})
    }
    try{
        const res = await fetch(api_url)
    const data = await res.json()
    return NextResponse.json({data})
    }
    catch(error){
        return NextResponse.json({"Message":'You a buster',error:error.message})
    }
    
}