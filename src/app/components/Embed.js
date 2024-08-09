import style from '@/app/styles/docName.module.css'


export default function Embed({embedsrc}){
    return(
        <div className={style.iframe_container_internal} dangerouslySetInnerHTML={{
            __html: `<iframe src=${embedsrc}></iframe>`
            }}
        ></div>
    )
    
}