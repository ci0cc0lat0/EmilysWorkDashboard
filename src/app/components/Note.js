import { BlocksRenderer } from "@strapi/blocks-react-renderer";


export default function Note({ data }){
    const note = data.note;
    if(note == null){
        return
    }
    console.log(note)
    return(
        <BlocksRenderer content={note}/>
    )
}