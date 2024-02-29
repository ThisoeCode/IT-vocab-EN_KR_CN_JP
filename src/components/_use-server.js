'use server'
import DEL from "@/_serv/delete"
import{API, convertToDb}from"@/_serv/lib"


/** client putting func */
export const put = async data=>{
  const doc = convertToDb(data)
  const rowID = await (await fetch(API,{
    cache,
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(doc),
  })).json()
  return rowID || null
}

/** client updating func */
export const up = async (id,column,data)=>{

}

/** client putting func */
export const dlt = async rid=>{
  console.log(rid)
  return DEL(rid)
}