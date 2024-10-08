export async function GET(request){
  const sort_enum = {
    'a-z':'title:asc',
    'z-a':'title:desc',
    'new':'Date:desc',
    'old':'Date:asc'
  }

  const searchParams = request.nextUrl.searchParams
  const doc_name = searchParams.get('doc_type')
  const market_name = searchParams.get('market_type')
  const group_name = searchParams.get('group_type')  
  const sort_name = searchParams.get('sort')
  const page_num = searchParams.get('page')
  const search_input = searchParams.get('search')

  let search_query = search_input ? search_input : '' 
  let market_filter = market_name ? `Market="${market_name}"` : '';
  let group_filter = group_name ? `Group="${group_name}"` : '';
  let doc_filter = doc_name ? `Document="${doc_name}"` : '';
  let sort_select =  sort_name ? [sort_enum[sort_name]] : [];
  
  function filter_parse(filter_array){
    const valid_filters = filter_array.filter(Boolean)
    if(valid_filters.length === 1) return valid_filters[0]
    else{return valid_filters.join(' AND ')}
  }

  try{
    const res = await fetch(`http://${process.env.API_MEILI}/indexes/document/search`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${process.env.MASTER_KEY}`
      },
      body: JSON.stringify({
        q:`${search_query}`,
        filter:`${filter_parse([market_filter,group_filter,doc_filter])}`,
        sort:sort_select,
        hitsPerPage:50,
        page:parseInt(page_num)
      }),
    })
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json()
    return Response.json({data});

  }
  catch(e){
    return Response.json({error:`I am the error; ${e}`})

  }
}