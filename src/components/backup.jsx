'use client'
import{bu}from"./_use-server"

export default function BACKUP(){
  const e =_=>{
    const serv_res = (async _=>{return(await bu())})()
    if(!serv_res){ // `bu()` returned falsy
      alert(serv_res===0
        ?'[Thisoe Alert]\nServer error!'
        :'You have no permission to make a backup.'
      )
    }else{ // `bu()` success
      window.confirm("Backup success!\nRefresh page now?")
        && window.location.reload()
    }
  }
  return <button id="backup" onClick={e}>Backup from Online</button>
}
