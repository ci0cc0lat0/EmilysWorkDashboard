export default function Embed({embedsrc}){
    return(
    <div dangerouslySetInnerHTML={{
          __html: `<iframe src=${embedsrc}></iframe>`
        }}
    ></div> 
    )
    
}