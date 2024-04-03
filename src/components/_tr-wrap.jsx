'use client'
import{useState}from "react"
import TR_inner from "./_table"

// This wrap is to handle hiding the row when deleted

export default function TR({tmpDelete,...props}){
  const [tmpdlt,setTmpdlt] = useState(0)
  const [tmpUNdlt,setTmpUNdlt] = useState(0)

  return <TR_inner
    cssClass={tmpdlt?(tmpUNdlt?'tr tmp-undlt':'tr tmp-delete'):'tr'}
    tmpDelete={_=>{setTmpdlt(1);setTmpUNdlt(0)}}
    tmpUndelete={_=>{setTmpUNdlt(1)}}
    {...props}
  />
}