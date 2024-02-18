export const tableConfig = {
  th: [
    'English',
    '한국어',
    '中文',
    '日本語',
    'Wikipedia',
    'Category',
    'Note',
    '&#128465;', // 🗑️
  ],
  val: ['en','ko','zh','ja','wiki','categ','note']
}

export default function TH(){
  let th = []
  tableConfig.th.forEach((v)=>{
    th.push(<i className="th">{v}</i>)
  })
  return <i id="th">{th}</i>
}

/**
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.css - className
 * @param {Object} props.ctnt - Obj of contents from db
 */
export default function TR({id,css,ctnt,}){
  let inputs = []
  tableConfig.val.forEach((v,i)=>{
    inputs.push(<input
      type="text"
      id={v}
      value={ctnt[i]}
    />)
  })

  return (
  <i
    className={{rowWrap,[css]:true}}
    id={id}
  >
    <form>
      {inputs}
      <button className="del-btn"/>
    </form>
  </i>
  )
}