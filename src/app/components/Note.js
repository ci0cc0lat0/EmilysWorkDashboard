import { BlocksRenderer } from "@strapi/blocks-react-renderer";


export default function Note({ data }){
    const note = data.Notes;
    return(
        <BlocksRenderer content={note}/>
    )
}