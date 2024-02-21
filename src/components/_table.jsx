import Input from "./InputField"

export const tableConfig = {
  th: [
    'English',
    '한국어',
    '中文',
    '日本語',
    'Wiki',
    // 'Category',
    'Note',
    '🗑️' // '&#128465;'
  ],
  val: ['en','ko','zh','ja','wiki','categ','note']
}

export const TH =_=>{
  let th = []
  tableConfig.th.forEach((v)=>{
    th.push(<i className="th block">{v}</i>)
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
    console.log(v==='wiki')
    inputs.push
    (<Input
      type="text"
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