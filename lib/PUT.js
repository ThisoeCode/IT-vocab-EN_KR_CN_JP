'use server'
export default async function put({doc}){
  const res = await fetch(process.env.SELF_DOMAIN_URL + '/api/v0/',{
    cache: 'no-store',
    method: 'PUT',
    headers:{'Content-Type':'application/json'},
    body:doc,
  })
  // RUN `PUT`
  if(res.ok){
    return (await res.json())
  }
  return null
}