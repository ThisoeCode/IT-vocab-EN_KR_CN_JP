'use server'
import PUT, { convertThisoe } from "@/_serv/put"
import TempRow from "./tempNewRow"

// client putting func
export const put = async (data)=>{
  const doc = convertThisoe(data)
  console.log(doc)

  // const rowID = await PUT(doc)
  // return <TempRow rowId={rowID}/>
}