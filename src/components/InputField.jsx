'use client'
import {useState,useEffect} from "react"
/**
 * @typedef {Object} InputProps
 * @property {Function|false} _post
 *  - Posting function callback (use server)
 * @property {import("react").InputHTMLAttributes<HTMLInputElement>.value} [value='']
 * @property {boolean} [isWiki=false]
 *  - Enable Wikipedia link (Ctrl + click)
 * @property {Function} [_change] - Add-on to `onChange` attr
 */
/**
 * @param {InputProps & HTMLInputElement} props
 */
export default function Input({_post,value='',isWiki=false, _change=_=>{undefined}, ...params}){
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
    <input type="text"
      value={valueState}
      onChange={e=>{
        setValue(e.target.value)
        _change(e)
      }}
      onKeyDown={e=>{ // Press Enter to post
        if(e.key==='Enter' && window.confirm("Sure to save?")){
          _post ? _post(valueState) : (_=>{
            e.preventDefault()
            e.target.form.requestSubmit()
            e.target.form.dispatchEvent(
              new Event("submit", { cancelable: true })
            )
          })()
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