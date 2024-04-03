import Input,{DeleteBtn} from "./InputField"
import {tableConfig} from "@/_serv/_config"
import {ridToHid} from "@/_serv/lib"

export const TH =_=>{
  let th = []
  tableConfig.th.forEach((v,i)=>{
    th.push(<i key={i} className="th td">{v}</i>)
  })
  return <i id="th" className="tr">{th}</i>
}

export function TD({children,...props}){
  return <i className="td" {...props}>{children}</i>
}


/**
 * @param {Object} props
 * @param {string} props.id Row ID
 * @param {Object} props.ctnt Obj of contents from db
 * @param {Function|false} props.post Post method callback (use server)
 * @param {string} [props.cssClass] className
 */
export default function TR_inner({id,ctnt,post,tmpDelete,tmpUndelete,cssClass=''}){
  let inputs = []
  tableConfig.th.forEach((v,i)=>{
    if(v==='🗑️')
      inputs.push(
        <DeleteBtn key={`dltBtn-${id}`}
        rowID={id} tmpDelete={tmpDelete} tmpUndelete={tmpUndelete}/>
      )
    else 
      inputs.push(
        <Input key={'hy1_'+i}
          _col={v}
          _value={ctnt[v]}
          _post={post}
          _rid={id}
          isWiki={v==='사전'}
        />)
  })

  return (
  <i id={ridToHid(id)} className={cssClass}>
    {inputs}
  </i>
  )
}