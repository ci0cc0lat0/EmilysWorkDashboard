import React from 'react'

async function get_data() {
    const res = await fetch(`http://${process.env.API_IP}:1339/API/docx-tests`, { next: { revalidate: 120 } })
    const posts = await res.json()
    return posts
  }
  

export default async function docs() {
    const data = await get_data()
    
  return (
    <>
        <h1>Docs Home page</h1>
        {data.data.map((item,index) => {
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
