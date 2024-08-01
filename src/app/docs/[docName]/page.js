import React from 'react'
import { notFound } from 'next/navigation'
import Embed from '@/app/components/Embed'
import Note from '@/app/components/Note'

/**
 * Gets all titles for dynamic routes
 * @returns {Array} An Array of docx Titles
 */
async function get_titles(){
  const res = await fetch(`http://${process.env.API_IP}:1339/API/docx-tests`)
  const data = await res.json()
  const titles = data.data.map((item) => item.attributes.Title)
  return titles
}


/**
 * Returns API object with data dependent on the current page
 * @param {string} docName The current dynamic route
 * @returns {object} An API Object
 */
// 
async function get_data(docName){
  const res = await fetch(`http://${process.env.API_IP}:1339/API/docx-tests?filters[Title][$eq]=${docName}`)
  const data = await res.json()
  return data
}


/**
 * Returns the API attribute object for given webpage
 * @param {object} api_object An API object
 * @returns {object} The attribute object
 */
function get_attributes(api_object){
  return api_object.data[0].attributes
}

/**
 * 
 * @param {string} embed The embed from Word 
 * @returns The 'src' link for the embed
 */
function parse_for_embed(embed){
  const srcRegex = /src="([^"]*)"/;
  const src = embed.match(srcRegex);
  return src[1]
}

export default async function docpage({ params }) {
  const title_array = await get_titles()
  const docName = decodeURI(params.docName);
  if(!title_array.includes(docName)){
    notFound();
  }
  
  let init_data = await get_data(docName)
  let data = get_attributes(init_data)
  let embed = parse_for_embed(data.docx_embed)

  return (
    <div>
        <a href="/docs">Link back</a>

        <h2>This is page: {decodeURI(params.docName)}</h2>




        <Note data={data} />
        <Embed embedsrc={embed}/>
    </div>
  )
}
