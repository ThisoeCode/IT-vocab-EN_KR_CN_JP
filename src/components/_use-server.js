'use server'
import{API, convertToDb}from"@/_serv/lib"


/** client putting func */
export const put = async data=>{
  const doc = convertToDb(data)
  const res = await fetch(API,{
    cache:'no-store',
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(doc),
  })
  if(res.ok){
    return (await res.json()).rid
  }
  return null
}


/** client deleting func */
export const dlt = async rid=>{
  const res = await fetch(API+rid,{
    cache:'no-store',
    method: 'DELETE',
  })
  if(res.status===200){
    return 1
  }
  if(res.status===304){
    return NaN
  }
  return null
}


/** client updating func */
export const up = async (id,column,data)=>{

}