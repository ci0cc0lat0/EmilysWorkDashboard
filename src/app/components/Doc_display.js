import React from 'react'

export async function getStaticProps() {
    const res = await fetch("anthost.ddns.net:1339/api/")
    const posts = await res.json()


    return{
        props: {
            posts,
        },
    }
}

export default function Doc_display({}) {
  return (
    <div></div>
  )
}
