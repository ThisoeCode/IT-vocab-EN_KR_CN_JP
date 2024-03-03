import TR from "./_tr-wrap"
import {up} from "./_use-server"
import{API, convertToTr}from"@/_serv/lib"

export default async function Mainlist(){
  const r = async _=>{
    const rows = [];
    const data = await(
      await fetch(API,{
        method: 'GET',
        cache: 'no-store',
      })).json()
    if(data.thisoe===200){
      data.docs.forEach((v,i)=>{
        const rid = v.id
        rows.push(
        <TR key={i}
          id={rid}
          ctnt={convertToTr(v)}
          post={up}
        />)
      })
    }else{
      /** @todo nohurry-- Go to `src\app\serv\route.js` to return error message. */
      undefined
    }
    return rows
  }

  return <i id="mainlist">{await r()}</i>
}