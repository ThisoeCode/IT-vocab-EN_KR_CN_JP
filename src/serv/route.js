import{NextResponse}from"next/server"

import{v4}from"uuid"
const uuid=v4()

import insu from "@/_serv/_insu"
const collection = (async _=>{
  const {db} = await insu()
  return db.collection(process.env.DB_COLL)
})()

// LOAD: get all rows
export async function GET(){
  const docs = await collection
    .find({}/*,{_id:0}*/)
    .sort({ 'createtime': -1 })
    .toArray()

  console.log(`[Thisoe msg:200] Loaded ${docs.length} rows.`)
  return NextResponse.json(docs)
}


// PUT: create new row
export async function PUT(request){
  const res = await collection.insertOne(request.json())
  console.log(`[Thisoe msg] PUT success: ID[${res.insertedId}`)
  return res.insertedId
}


// UPDATE: change one 
export async function PATCH(request){
  console.log(request.json())
  // const res = await collection.updateOne(
  //   { _id: id },
  //   { $set: newData }
  // )

  // if (res.modifiedCount === 1) {
  //   console.log(`[Thisoe msg] ID[${documentId}] updated success.`)
  //   return true
  // } else {
  //   console.log(`[Thisoe msg] ID[${documentId}] not found or no change.`)
  //   return false
  // }

}


// DEL: delete row
export async function DELETE(){

}