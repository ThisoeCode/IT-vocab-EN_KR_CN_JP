import{NextResponse}from"next/server"
import insu from"@/lib/_insu"
import uuid from"@/lib/uuid"

export async function PUT(req){
  req = await req.json()
  const res = await(
    await(async _=>{
      const {db} = await insu()
      return db.collection(process.env.DB_COLL)
    })()
  ).insertOne(req)
  console.log(`[Thisoe msg::PUT 201] Added new row: ObjectId[${res.insertedId}]`)
  return NextResponse.json(
    {status:"success",uuid:uuid.shorten(req.id)},
  )
}