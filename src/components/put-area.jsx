import PUT from "@/_serv/put"
import TR from "./_table"
import TempRow from "./tempNewRow"

export default function New(){
  const put = async (...data)=>{
    'use server'
    /** @todo Add temp row with PUT ID */
    const rowID = await PUT(...data)
    return <TempRow rowId={rowID}/>
  }
  return <TR
    id='new'
    cssClass='new'
    ctnt={{}}
    post={false}
  />
}