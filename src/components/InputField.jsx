'use client'
import {useState,useEffect,InputHTMLAttributes,HTMLInputTypeAttribute} from "react"
import { TD } from "./_table"
import { dlt } from "./_use-server"

/**
 * @typedef {Object} ThisoeInputProps
 * @property {Function|false} _post  Save the input when hit Enter.
 *  - Pass in POSTing function (annotated with `'use server'`) to callback
 *  - Pass in `false` to submit the parent form
 * @property {InputHTMLAttributes<HTMLInputElement>.value} [_value='']
 * @property {HTMLInputTypeAttribute} [_type='text']
 * @property {boolean} [isWiki=false]  Enable Wikipedia link (Ctrl + click)
 * @property {Function} [_change=_=>{undefined}]  Add-ons to `onChange` attr
 */
/**
 * @param {ThisoeInputProps & HTMLInputElement} props
 */
export default function Input({
  _post,
  _value='', _type='text',
  isWiki=false, _change=_=>{undefined},
  ...params
}){
  const [valueState,setValue] = useState(_value)
  const [ctrlState,setCtrl] = useState(false)
  useEffect(_=>{ // Ctrl detect
    const keydown =e=>{
      isWiki && e.ctrlKey && setCtrl(true)
    }
    const keyup=_=>{
      setCtrl(false)
    }
    document.addEventListener('keydown',keydown)
    document.addEventListener('keyup',keyup)
    return _=>{
      document.removeEventListener('keydown',keydown)
      document.removeEventListener('keyup',keyup)
    }
  },[isWiki])

  const css =(_=>{
    let ret = {}
    if(isWiki&&valueState){ret={...ret,
      textDecoration:"underline",
      color:"#3bf",
    }}
    if(valueState&&ctrlState){ret={...ret,
      cursor:"pointer"
    }}else{ret={...ret,
      cursor:"auto"
    }}
    return ret
  })()

  return <TD>
    <input type={_type}
      value={valueState}
      onChange={e=>{
        setValue(e.target.value)
        _change(e)
      }}
      onKeyDown={e=>{ // Press Enter to post
        if(e.key==='Enter' && window.confirm("Sure to save?")){
          if(_post) _post(valueState)
          else(_=>{
            e.preventDefault()
            e.target.form.requestSubmit()
          })()
        }
      }}
      onClick={e=>{ // Ctrl+click to open Wiki
        if (isWiki && e.ctrlKey && e.button===0 && valueState) {
          const url = `https://wikipedia.org/wiki/${valueState.trim().replace(/ /g,'_')}`
          window.open(url, '_blank')
        }
      }}
      style={css}
      title={isWiki&&valueState?`Ctrl+click to visit Wikipedia page of ${valueState.trim()}`:null}
      {...params}
    />
  </TD>
}


export function DeleteBtn({rowID}){
  return <TD>
  <input key='rubbish-bin'
    type='button'
    value='🗑️'
    onClick={async _=>{
      if(confirm("Are you sure to delete this row?\nIt will be gone forever!")){
        if(await dlt(rowID)){
          /** @todo remove deleted row from DOM */
        }
      }
    }}
  /></TD>
}