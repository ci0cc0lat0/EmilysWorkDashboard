import { notFound } from "next/navigation"
async function get_titles(){
  const res = await fetch(
    `http://${process.env.API_IP}/API/todo-lists`,
    { next: { revalidate: 120 } })
    const data = await res.json()
    const titles = data.data.map((item)=> item.attributes.url_title)
    return titles
}

export default async function todopage({params}){
  const title_array = await get_titles()
  const todo_list_name = decodeURI(params.listpage)
  if(!title_array.includes(todo_list_name)){
    notFound()
  }
  return (
    <></>
  )
}