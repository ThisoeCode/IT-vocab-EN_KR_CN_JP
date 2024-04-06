'use client'
import{useState}from"react"
import put from"@/lib/PUT"
import uuid from "@/lib/uuid"

export default function _(){

  const[res,setRes]=useState('{}')
  const putDataBody = (_=>{
    const id = new uuid
    return JSON.stringify({
      'id'  : id.new,
     'word' : 'TEST',
    'hanja' : 'FROM',
     'mean' : '`vercel-put-test`',
     'link' : '',
     'memo' : id.short,
    'check' : 'vercel-put-test',
    'createdtime':Date.now()
    })
  })()

return <>
  <form
    action={async _=>{
      // console.log(putDataBody)
      const ret = await put({doc:putDataBody})
      setRes(JSON.stringify(ret).replace(/,/g,',\n  ').replace(/{/g,'{\n  ').replace(/}/g,'\n}'))
    }}
  >
    <input type="submit" value={'`PUT` TEST SUBMIT'}/>
  </form>
  <textarea disabled value={res}></textarea>
</>
}