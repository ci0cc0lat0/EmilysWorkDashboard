export default function Embed({embedsrc}){
    return(
    <div className="iframe_container_a">
        <div className="iframe_container_b" dangerouslySetInnerHTML={{
            __html: `<iframe src=${embedsrc}></iframe>`
            }}
        ></div>
    </div>
    )
    
}