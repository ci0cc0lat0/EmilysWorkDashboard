export default function({state, func, children, classNameButton, classNameDiv}){
  return(
    <div className={classNameDiv}>
      <button className={classNameButton} onClick={func}>{children}</button>
    </div>
  )
}