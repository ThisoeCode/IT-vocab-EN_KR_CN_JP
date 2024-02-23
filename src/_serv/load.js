import insu from "./_insu"

export default async function LOAD(){
  const { db } = await insu() // Establish MongoDB connection

  const collection = db.collection(process.env.DB_COLL)
  const documents = await collection.find({}).toArray()

  console.log(`[Thisoe msg] Successfully loaded ${documents.length} rows.`)
  return documents
}