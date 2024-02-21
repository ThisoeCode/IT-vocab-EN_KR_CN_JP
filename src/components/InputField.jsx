'use client'
import {useState,useEffect} from "react"
/**
 * @typedef {Object} InputProps
 * @property {Function|false} _post
 *  - Posting function callback (use server)
 * @property {import("react").InputHTMLAttributes<HTMLInputElement>.value} [value='']
 * @property {boolean} [isWiki=false]
 *  - Enable Wikipedia link (Ctrl + click)
 */
/**
 * @param {InputProps & HTMLInputElement} props
 */
export default function Input({_post,value='',isWiki=false, ...params}){
  const [valueState,setValue] = useState(value)
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
  },[])

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

  return <i className="block">
    <input
      value={valueState}
      onChange={e=>{setValue(e.target.value)}}
      onKeyDown={e=>{ // Press Enter to post
        if(_post && e.key==='Enter' && window.confirm("Sure to save?")){
          _post(valueState)
        }}}
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
  </i>
}