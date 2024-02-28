'use server'
import DEL from "@/_serv/delete"
import{API, convertToDb}from"@/_serv/lib"

// client updating func
export const up = async (id,column,data)=>{

}


// client putting func
export const put = async data=>{
  const doc = convertToDb(data)
  const rowID = await fetch(API,{method:'GET'})
  return rowID || null
}


// client putting func
export const dlt = async rid=>{
  console.log(rid)
  return DEL(rid)
}