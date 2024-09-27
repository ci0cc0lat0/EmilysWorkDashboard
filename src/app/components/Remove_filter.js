import s from "@/app/components/style/Remove_button.module.scss"

export default function Remove_button({state, state_func}){
  function handle_onClick(){
    console.log("I am clicked")
    state_func()
  }
  if(state) return (
    <div className={s.remove_container}>
        <h1 onClick={state_func}><i>{state} &times;</i></h1>
    </div>
  )
  else{
    return(
      <></>
    )
  }

  
}