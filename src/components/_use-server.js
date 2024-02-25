'use server'
import PUT, {convertToDb} from "@/_serv/put"


// client updating func
export const up = async (id,column,data)=>{

}


// client putting func
export const put = async data=>{
  const doc = convertToDb(data)
  const rowID = await PUT(doc)
  return rowID || null
}


// client putting func
export const dlt = async rid=>{
  console.log(rid)
}