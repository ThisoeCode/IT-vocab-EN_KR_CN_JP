import insu from "./_insu"
import {convertConfig} from "./_config"

export function convertToTr(inObj){
  const finalObj = {}
  for (const key in convertConfig) {
    if(!convertConfig[key]){continue}
    finalObj[convertConfig[key]] = 
      inObj.hasOwnProperty(key) ?
        inObj[key] : ''
  }
  return finalObj
}


///////
export default async function LOAD(){
  const {db} = await insu()

  const collection = db.collection(process.env.DB_COLL)
  const documents = await collection.find({}).sort({ 'createtime': -1 }).toArray()

  console.log(`[Thisoe msg] Successfully loaded ${documents.length} rows.`)
  console.log(documents)
  return documents
}