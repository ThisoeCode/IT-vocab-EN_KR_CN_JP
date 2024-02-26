import Input, { DeleteBtn } from "./InputField"
import {tableConfig} from "@/_serv/_config"

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
 * @param {Function} props.deletion Delete-row function
 * @param {string} [props.cssClass] className
 * @todo `deletion` is not used yet!
 */
export default function TR({id,ctnt,post,deletion,cssClass=''}){
  let inputs = []
  tableConfig.th.forEach((v,i)=>{
    if(v==='🗑️')
      inputs.push(
        <DeleteBtn  key='DeleteBtn' rowID={1}/>
      )
    else 
      inputs.push(
        <Input key={'hy1_'+i}
          name={v}
          _value={ctnt[v]}
          _post={post}
          isWiki={v==='Wiki'}
        />)
  })

  return (
  <i id={id} className={`tr ${cssClass}`}>
    {inputs}
    <button className="del-btn" onClick={deletion}/>
  </i>
  )
}