import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/_serv/lib"

import insu from "@/_serv/_insu"
export const collection = (async _=>{
  const {db} = await insu()
  return db.collection(process.env.DB_COLL)
})()



/** 1.
 * LOAD: get all rows
 * @param {NextRequest} req
 */
export async function GET(req){t.t1(req)
  try{
    /** @type {Array} */
    const docs = await(await collection)
      .find({},{projection:{'_id':0}})
      .sort({ 'createdtime': -1 })
      .toArray()

    console.log(`[${t.t2}LOAD 200] Loaded ${docs.length} rows.`)
    return NJ({thisoe:200,docs})
  }catch(_){
    console.error(t.t500('LOAD'))
    console.dir(_)
    return t.NJ500
  }
}



/** 2.
 * @param {NextRequest} req
 */
export async function PUT(req){t.t1(req)
  try{
    req = await req.json()
    try {
      const res = await(await collection)
        .insertOne(req)
      console.log(`[${t.t2}PUT 200] Added new row: ObjectId[${res.insertedId}]`)
      return NJ({rid:req.id})
    }catch(e){
      console.log(`[${t.t45}PUT 500] Fail to add row: ObjectId[${res.insertedId}]`)
      return NJ({rid:null},{status:500})
    }
  }catch(_){
    console.error(t.t500('PUT'))
    console.dir(_)
    return t.NJ500
  }
}