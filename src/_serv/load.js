import insu from "./_insu"
import {convertConfig} from "./_config"

/** @returns {Promise<Array<Object>>} */
export default async function LOAD(){
  const {db} = await insu()

  const collection = db.collection(process.env.DB_COLL)
  const documents = await collection.find({}/*,{_id:0}*/).sort({ 'createtime': -1 }).toArray()

  console.log(`[Thisoe msg] Successfully loaded ${documents.length} rows.`)
  return documents
}