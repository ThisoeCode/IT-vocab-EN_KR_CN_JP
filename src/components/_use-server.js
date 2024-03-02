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
  const doc = convertToDb(data)
  const res = await fetch(API,{
    cache:'no-store',
    method: 'DELETE',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({rid}),
  })
  if(res.status===200){
    console.log(`[${t2}DELETE 200] ID: ${rid}`)
    return (await res.json()).rid
  }
  if(res.status===304){
    return null
  }
  return null
}

/** client updating func */
export const up = async (id,column,data)=>{

}