import insu from "./_insu"
import { tableConfig } from "@/components/_table"

export default async function PUT(...data){
  const time = Date.now() - 1708000000000 // lol
  wiki = wiki.substring(wiki.indexOf("wiki/") + 5)

  const { db } = await insu()
  const collection = db.collection(process.env.DB_COLL)

  const doc = {time}
  tableConfig.val.forEach((prop, i) => {
    doc[prop] = data[i]
  })
  const res = await collection.insertOne(doc)

  console.log(`PUT success: ID[${res.insertedId}`)
  return res.insertedId
}