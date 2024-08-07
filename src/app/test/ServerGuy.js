import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useRouter } from "next/navigation";


export default function server_guy({data_func, data_api, sort_state, sort_func}){
  const router = useRouter();
  const search_params = useSearchParams();
  const sortby = search_params.get("sort")

  useEffect(()=>{
    if(sortby){
      sort_func(sortby)
    }
  },[sortby])

  

  useEffect(()=>{
    async function fetch_data(){
      const res = await fetch(`/test/api?sort=${sort_state}`)
      const data = await res.json()
      data_func(data)
    }
    
    fetch_data()
    router.push(
      `?sort=${sort_state}`
  )
  },[sort_state])

  return (
    <>
      {data_api?.data?.data.map((item,index) => {
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