'use client'
import {useState} from "react"

/**
 * @param {import("react").InputHTMLAttributes} params
 * @param {Function} params._post
 *  - Posting function callback (use server)
 */
export default function Input({_post,...props}){
  const [valueState,setValue] = useState('')
  return <input
    onChange={e=>{setValue(e.target.value)}}
    onKeyDown={e=>{
      e.key==='Enter' &&
      window.confirm("Sure to save this row?") &&
      _post(valueState)
    }}
    {...props}
  />
}