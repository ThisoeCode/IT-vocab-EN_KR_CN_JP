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
 * @todo Fix warning `Each child in a list should have a unique "key" prop. Check the top-level render call using <i>.`
 * @todo Add ` key={i}`
 */
export default function TR({id,ctnt,post,deletion,cssClass=''}){
  let inputs = []
  tableConfig.th.forEach((v,i)=>{
    v==='🗑️'
    ? inputs.push(<DeleteBtn  key='DeleteBtn' rowID={1}/>)
    : inputs.push(
      <Input key={i}
        name={v}
        _value={ctnt[v]}
        _post={post}
        isWiki={v==='wiki'}
      />)
  })

  return (
  <i
    className={`tr ${cssClass}`}
    id={id}
  >
    {inputs}
    <button className="del-btn"/>
  </i>
  )
}