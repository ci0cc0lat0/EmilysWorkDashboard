import { notFound } from "next/navigation"
import List_Note from '@/app/components/List_Note'
import style from '@/app/styles/docName.module.css'
import { Poppins } from 'next/font/google'


const Robo_Mono = Poppins({
  weight:['200','300','400','500','600','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font'
})

async function get_titles(){
  const res = await fetch(
    `http://${process.env.API_IP}/API/todo-lists`,
    { next: { revalidate: 120 } })
    const data = await res.json()
    const titles = data.data.map((item)=> item.attributes.url_title)
    return titles
}

async function get_data(url_title){
  const res = await fetch(
    `http://${process.env.API_IP}/API/todo-lists?filters[url_title][$eq]=${url_title}`,
     { next: { revalidate: 120 } })
  const data = await res.json()
  return data
}

function get_attributes(api_object){
  return api_object.data[0].attributes
}

export default async function todopage({params}){
  const title_array = await get_titles()
  const todo_list_name = decodeURI(params.listpage)
  if(!title_array.includes(todo_list_name)){
    notFound()
  }

  let init_data = await get_data(todo_list_name)
  let data = get_attributes(init_data)
  
  return (
    <div className={`${style.document_page} ${Robo_Mono.className}`}>
      <div className={style.note_section}>
      <h1 className={style.url_title}>{data.url_title}</h1>
      <div className={style.note_section}>
        <List_Note data={data}/>
      </div>
      </div>
    </div>
  )
}