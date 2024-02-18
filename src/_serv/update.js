import insu from "./_insu"

export default async function UP(id,newData){
  const { db } = await insu()

  const collection = db.collection(process.env.DB_COLL)

  const res = await collection.updateOne(
    { _id: id },
    { $set: newData }
  )

  if (res.modifiedCount === 1) {
    console.log(`ID[${documentId}] updated success.`)
    return true
  } else {
    console.log(`ID[${documentId}] not found or no change`)
    return false
  }
}