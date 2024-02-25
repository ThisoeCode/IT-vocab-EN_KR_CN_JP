import insu from "./_insu"
import {convertConfig} from "./_config"

export function convertToDb(inObj){
  const finalObj = {}

  // General convert
  for (const key in convertConfig) {
    finalObj[key] =
    inObj.hasOwnProperty(convertConfig[key]) ?
      inObj[convertConfig[key]].trim() :
      ''
  }

  // Special properties
  if ('createtime' in convertConfig){
    finalObj['createtime'] = Date.now()
  }

  return finalObj
}


///////
export default async function PUT(doc){
  // console.log(doc)
  // const testId = "test_" + Math.floor(Math.random()*999)
  try {
    const { db } = await insu()
    const collection = db.collection(process.env.DB_COLL)

    const res = await collection.insertOne(doc)

    console.log(`[Thisoe msg] PUT success: ID[${res.insertedId}`)
    return res.insertedId
    // return testId
  } catch (err) {
    console.error('[Thisoe ERROR] PUT() ERROR: \n'+err)
    return false
  }
}