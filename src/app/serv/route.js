import{NextRequest,NextResponse}from"next/server"

import insu from "@/_serv/_insu"
const collection = (async _=>{
  const {db} = await insu()
  return db.collection(process.env.DB_COLL)
})()

const NJ = j=>{return NextResponse.json(j)}
/** @param {NextRequest} req */
const t1 = req=>{
  let ip = req.headers.get('x-forwarded-for')
  if(ip==='::1'){
    ip='127.0.0.1'
  }else{
    ip=ip?ip.trim():'0.0.0.0'
  }
  let geo = req.headers.get('x-real-ip')
  geo=geo?geo.trim():'--'
  console.log(`[Thisoe API_LAUNCH] From(IP): ${ip} [${geo}]`)
  return void 1
}
const t2 = 'Thisoe msg::'
const t3 = 'Thisoe WARNING::'
const t45 = 'Thisoe FATAL::'

// LOAD: get all rows
export async function GET(req){t1(req)
  /** @type {Array} */
  const docs = await (await collection)
    .find({}/*,{_id:0}*/)
    .sort({ 'createtime': -1 })
    .toArray()

  console.log(`[${t2}LOAD 200] Loaded ${docs.length} rows.`)
  return NJ({thisoe:200,docs})
}


// PUT: create new row
export async function PUT(req){t1(req)
  console.log(req.length) // TODO DELETE log
  try {
    const res = await collection.insertOne(req.json())
    console.log(`[${t2}PUT 201] ID[${res.insertedId}`)
    return NJ({thisoe:200})
  }catch(e){
    console.log(`[${t45}PUT 500] ID[${res.insertedId}`)
    return NJ({thisoe:500})
  }
}


// UPDATE: change one 
export async function PATCH(req){t1
  console.log(req.json()) // TODO DELETE log
  // const res = await collection.updateOne(
  //   { _id: id },
  //   { $set: newData }
  // )

  // if (res.modifiedCount === 1) {
  //   console.log(`[${t2}UPDATE 200] ID[${documentId}] updated success.`)
  //   return true
  // } else {
  //   console.log(`[${t3}UPDATE 304] ID[${documentId}] not found or no change.`)
  //   return false
  // }

}


// DEL: delete row
export async function DELETE(){t1
  const res = ObjectId.isValid(rid)
    ? await collection.deleteOne({_id: new ObjectId(rid)})
    : NaN
  if(res){
    if(res.deletedCount===1){
      console.log(`[${t2}DELETE] Row [${rid}] deleted.`)
      return NJ({stat:1})
    }else{
      console.log(`[${t3}DELETE] No row was deleted - while trying to delete row [${rid}].`)
      return NJ({stat:0})
    }
  }else{
    console.log(`[${t4}DELETE] Row [${rid}] was NOT deleted - not a valid MongoDB ObjectID!!!`)
    return NJ({stat:NaN})
  }
}