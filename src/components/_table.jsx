import Input from "./InputField"
import {tableConfig} from "@/_serv/_config"

export const TH =_=>{
  let th = []
  tableConfig.th.forEach((v,i)=>{
    th.push(<i key={i} className="th block">{v}</i>)
  })
  return <i id="th" className="tr">{th}</i>
}

/**
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.cssClass - className
 * @param {Object} props.ctnt - Obj of contents from db
 * @param {Function|false} props.post - Post method callback (use server)
 * @todo Fix warning `Each child in a list should have a unique "key" prop. Check the top-level render call using <i>.`
 * @todo Add ` key={i}`
 */
export default function TR({id,cssClass,ctnt,post}){
  let inputs = []
  tableConfig.val.forEach((v,i)=>{
    inputs.push
    (<Input key={i}
      name={v}
      value={ctnt[i]}
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