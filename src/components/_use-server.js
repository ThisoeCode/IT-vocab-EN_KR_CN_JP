'use server'
import{API,headJ,convertToDb,convertPatch}from"@/_serv/lib"


/** client putting func */
export const put = async doc=>{
  const body = JSON.stringify(convertToDb(doc))
  const res = await fetch(API,{
    cache:'no-store',
    method: 'PUT',
    headers:headJ,
    body,
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
    return true
  }
  if(res.status===304){
    return NaN
  }
  return null
}


/** client updating func */
export const up = async (id,column,data)=>{
  const res = await fetch(API+id,{
    cache:'no-store',
    method: 'PATCH',
    headers:headJ,
    body: JSON.stringify(
        convertPatch({[column]: data})
      ),
  })

  if(res.ok){return 1}
  return 0
}