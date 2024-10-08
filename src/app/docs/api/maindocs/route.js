export async function GET(req){
  const url_sort_addons = {
    '':'',
    'a-z':'sort=title:asc',
    'z-a':'sort=title:desc',

    // Main
    'new':'sort=Date:desc',
    'old':'sort=Date:asc',

    'asc':'sort=meeting_date:asc',
    'desc':'sort=meeting_date:desc',
  }


  const searchParams = req.nextUrl.searchParams
  const sort_name = searchParams.get('sort')
  const doc_name = searchParams.get('doc_type')
  const market_name = searchParams.get('market_type')
  const group_name = searchParams.get('group_type')
  const page_num = searchParams.get('page')
  const search_input = searchParams.get('search')
  console.log(page_num)

  let search_url = `http://${process.env.API_IP}/api/fuzzy-search/search?query=${search_input}`
  let api_url = `http://${process.env.API_IP}/api/documents?pagination[pageSize]=50`

  let test_url = `http://${process.env.API_IP}/api/documents`
  
  if(search_input){
    /*
    filters
    https://emmi.anthonyciocco.com/api/fuzzy-search/search?query=meeting&filters[documents][Market][$eq]=NV

    paginate
    https://emmi.anthonyciocco.com/api/fuzzy-search/search?query=meeting&pagination[documents][pageSize]=1&pagination[documents][page]=2
    */
    console.log(search_url)
    try{
      const resp = await fetch(search_url)
      const data1 = await resp.json()
      const data = {
        data: data1.documents.map((doc)=>({
          id:doc.id,
          attributes:{
            title:doc.title,
            docx_embed: doc.docx_embed,
            note: doc.note,
            Market:doc.Market,
            createdAt: doc.createdAt,
            updatedAt:doc.updatedAt,
            publishedAt:doc.publishedAt,
            Date:doc.Date,
            Document:doc.Document,
            Group:doc.Group,
          }
        }))
      }
      console.log({data})
      return Response.json({data})
    }
    catch(e){
      return Response.json({error:`I am the error; ${e}`})
    }
  }
  //console.log("querys",sort_name,doc_name,market_name,group_name,meeting_name)
  //console.log(url_sort_addons[sort_name])
  let filter_doc = ''
  let filter_market = ''
  let filter_group = ''
  let filter_meeting = ''
  let paginate = ''
  if(doc_name){
    filter_doc = `&filters[Document][$eq]=${doc_name}`
  }
  if(market_name){
    filter_market = `&filters[Market][$eq]=${market_name}`
  }
  if(group_name){
    filter_group = `&filters[Group][$eq]=${group_name}`
  }
  if(page_num){
    paginate = `&pagination[page]=${page_num}`
  }

  api_url = api_url+paginate+'&'+url_sort_addons[sort_name]+filter_doc+filter_market+filter_group

  console.log(api_url)
  /* switch (sort_name) {
    case 'a-z':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Title:asc`
      break;
    case 'z-a':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Title:desc`
      break
    case 'new':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=createdAt:desc`
      break;
    case 'old':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=createdAt:asc`
      break;
    case 'asc':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Meeting_Date:asc`
      break;
    case 'desc':
      api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Meeting_Date:desc`
      break;
    default:
      break;
  }  */
  /*
  if(sort_name == sort_name){
    api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Title:${sort_name}`
  }
   else if(sort_meeting == sort_meeting){

    api_url = `http://${process.env.API_IP}/api/docx-tests?sort=Meeting_Date:${sort_meeting}`
  }
  else if(sort_creation == sort_creation){

    api_url = `http://${process.env.API_IP}/api/docx-tests?sort=createdAt:${sort_creation}`
  } */
  //console.log(api_url)

  try{
    const resp = await fetch(api_url)
    const data = await resp.json()
    return Response.json({data})
  }
  catch(e){
    return Response.json({error:`I am the error; ${e}`})
  }
}