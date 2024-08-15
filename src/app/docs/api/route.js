export async function GET(req){
  const url_sort_addons = {
    '':'',
    'a-z':'sort=title:asc',
    'z-a':'sort=title:desc',
    'new':'sort=createdAt:desc',
    'old':'sort=createdAt:asc',
    'asc':'sort=meeting_date:asc',
    'desc':'sort=meeting_date:desc',
  }


  const searchParams = req.nextUrl.searchParams
  const sort_name = searchParams.get('sort')
  const doc_name = searchParams.get('doc_type')
  const market_name = searchParams.get('market_type')
  const group_name = searchParams.get('group_type')
  const meeting_name = searchParams.get('meeting_type')


  let api_url = `http://${process.env.API_IP}/api/documents`

  let test_url = `http://${process.env.API_IP}/api/documents`
  
  //console.log("querys",sort_name,doc_name,market_name,group_name,meeting_name)
  //console.log(url_sort_addons[sort_name])
  let filter_doc = ''
  let filter_market = ''
  let filter_group = ''
  let filter_meeting = ''
  if(doc_name){
    filter_doc = `&filters[doc_type][$eq]=${doc_name}`
  }
  if(market_name){
    filter_market = `&filters[market][$eq]=${market_name}`
  }
  if(group_name){
    filter_group = `&filters[group][$eq]=${group_name}`
  }
  if(meeting_name){
    filter_meeting = `&filters[meeting][$eq]=${meeting_name}`
  }

  api_url = test_url+'?'+url_sort_addons[sort_name]+filter_doc+filter_market+filter_group+filter_meeting

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