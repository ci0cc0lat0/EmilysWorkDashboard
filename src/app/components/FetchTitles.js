'use server'
import React from 'react'
import style from '@/app/fetchtitles.module.css'
import SimpleButton from './SimpleButton'


async function get_data() {
    const res = await fetch(`http://${process.env.API_IP}:1339/API/docx-tests?sort=createdAt:DESC`, { next: { revalidate: 120 } })
    const posts = await res.json()
    return posts
  }

export default async function FetchTitles() {
    const data = await get_data()
    
  return (
    <>
        <div className={style.link_container}>
        {/* <SimpleButton/> */}
            
            {data.data.map((item,index) => {
            return (
            <p key={index}>
                <a href={`/docs/${item.attributes.Title}`}>
                {item.attributes.Title}
                </a>
            </p>)
            })}

        </div>
    </>
  )
}
