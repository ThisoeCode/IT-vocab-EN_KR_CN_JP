import LOAD,{convertToTr} from "@/_serv/load"
import TR from "./_table"
import {dlt, up} from "./_use-server"

export default async function Mainlist(){
  const r = async _=>{
    const data = await LOAD()
    const rows = []
    data.forEach((v,i)=>{
      const rid = v._id.toString()
      rows.push(
      <TR key={i}
        id={rid}
        ctnt={convertToTr(v)}
        post={up}
        deletion={dlt}
      />)
    })
    return rows
  }

  return <i id="mainlist">{await r()}</i>
}