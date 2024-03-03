import{NextRequest,NextResponse}from"next/server"

import insu from "@/_serv/_insu"
export const collection = (async _=>{
  const {db} = await insu()
  return db.collection(process.env.DB_COLL)
})()

export const NJ =_=>{
  return NextResponse.json(_)
}

/** @param {NextRequest} req */
const t1 = req=>{
  let ip = req.headers.get('x-forwarded-for')
  if(['::1',null,'127.0.0.1'].includes(ip)){
    ip='localhost'
  }else{
    ip=ip?ip.trim():'0.0.0.0'
  }
  let geo = req.headers.get('x-real-ip')
  geo=geo?geo.trim():'--'
  console.log(`\n[Thisoe API_LAUNCH] From(IP): ${ip} [${geo}]`)
  return void 1
}
const t2 = 'Thisoe msg::'
const t3 = 'Thisoe WARNING::'
const t45 = 'Thisoe FATAL::'
export const servTitle = {t1,t2,t3,t45}



/** 1.
 * LOAD: get all rows
 * @param {NextRequest} req
 */
export async function GET(req){t1(req)
  try{
    /** @type {Array} */
    const docs = await(await collection)
      .find({},{projection:{'_id':0}})
      .sort({ 'createdtime': -1 })
      .toArray()

    console.log(`[${t2}LOAD 200] Loaded ${docs.length} rows.`)
    return NJ({thisoe:200,docs})
  }catch(_){console.dir(_)}
}



/** 2.
 * PUT: create new row
 * @param {NextRequest} req
 */
export async function PUT(req){t1(req)
  try{
    req = await req.json()
    try {
      const res = await(await collection)
        .insertOne(req)
      console.log(`[${t2}PUT 201] Added new row: ObjectId[${res.insertedId}]`)
      return NJ({rid:req.id},{status:201})
    }catch(e){
      console.log(`[${t45}PUT 500] Fail to add row: ObjectId[${res.insertedId}]`)
      return NJ({rid:null},{status:500})
    }
  }catch(_){console.dir(_)}
}