import insu from "./_insu"

export default async function PUT(doc){
  try {
    const { db } = await insu()
    const collection = db.collection(process.env.DB_COLL)

    const res = await collection.insertOne(doc)

    console.log(`[Thisoe msg] PUT success: ID[${res.insertedId}`)
    return res.insertedId
  } catch (err) {
    console.error('[Thisoe ERROR] PUT() ERROR: \n'+err)
    return false
  }
}