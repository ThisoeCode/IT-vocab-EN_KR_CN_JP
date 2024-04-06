
// THIS IS A DATABASE CONNECTION FILE.

import{MongoClient,ServerApiVersion}from'mongodb'
const{DB_URI,DB_NAME}=process.env

const con = new MongoClient(DB_URI,{serverApi:{version:ServerApiVersion.v1,strict:true,deprecationErrors:true}})
// export const client = con

let cachedClient = null
let cachedDb = null
export default async function insu(){
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  await con.connect()
  const db = con.db(DB_NAME)
  cachedClient = con
  cachedDb = db
  return { client: cachedClient, db: cachedDb }
}