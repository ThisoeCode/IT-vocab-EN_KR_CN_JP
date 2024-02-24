'use server'
import PUT, {convertToDb} from "@/_serv/put"
import TempRow from "./tempNewRow"

// client putting func
export const put = async (data)=>{
  const doc = convertToDb(data)

  const rowID = await PUT(doc) || 0
  return rowID ? <TempRow rowId={rowID} ctnt={data}/> : false
}