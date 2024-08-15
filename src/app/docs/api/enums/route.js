export async function GET(){
  let api_url = `http://${process.env.API_IP}/api/documents/enums`

  try{
    const resp = await fetch(api_url, {next: {revalidate: 120}})
    const data = await resp.json()
    return Response.json({data})
  }
  catch(e){
    return Response.json({error:`I am the error; ${e}`})
  }
}