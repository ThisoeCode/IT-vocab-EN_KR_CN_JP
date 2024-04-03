'use client'
import {useState,useEffect,HTMLInputTypeAttribute} from "react"
import { TD } from "./_table"
import { dlt } from "./_use-server"

/**
 * @typedef {Object} ThisoeInputProps
 * @property {Function|false} _post  Save the input when hit Enter.
 *  - Pass in POSTing function (annotated with `'use server'`) to callback
 *  - Pass in `false` to submit the parent form
 * @property {string} _col Column name (TH)
 * @property {string} _rid Row ID
 * @property {string} [_value='']
 * @property {HTMLInputTypeAttribute} [_type='text']
 * @property {boolean} [isWiki=false]  Enable Wikipedia link (Ctrl + click)
 * @property {Function} [_change=_=>{undefined}]  Add-ons to `onChange` attr
 */
/**
 * @param {ThisoeInputProps & HTMLInputElement} props
 */
export default function Input({
  _post,_rid,_col,
  _value='', _type='text',
  isWiki=false, _change=_=>{undefined},
  ...params
}){
  const [valueState,setValue] = useState(_value)
  const [ctrlState,setCtrl] = useState(false)
  useEffect(_=>{ // ("Wiki" field) Ctrl activation detection
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

  /**
   * For background-color with class 'unchanged', 'unsaved', 'failed', 'saved'
   */
  const updateState = useState('unchanged')
  const [commitValue,setCommitValue] = useState(_value)
  useEffect(_=>{ // `updateState` commander
    if(_post){
      valueState===commitValue
      ? updateState[1]('unchanged')
      : updateState[1]('unsaved')
    }
  },[valueState])

  return <TD>
    <input type={_type}
      value={valueState}
      name={_col}
      onChange={e=>{
        setValue(e.target.value)
        _change(e)
      }}
      onKeyDown={e=>{ // Press Enter to post
        if(e.key==='Enter' && window.confirm("Sure to save the change of this cell?")){
          if(_post){ // updateOne
            if(!(async _=>{return (await _post(_rid,_col,valueState))})()){
              // update backend responses fatal
              updateState[1]('failed').then(_=>{
                alert('Modify failed due to server errors.\n(Red field)')
              })
            }else{ // update succeed (from server)
              updateState[1]('saved')
              setCommitValue(valueState)
            }
          }else(_=>{ // submit <form>
            e.preventDefault()
            e.target.form.requestSubmit()
          })()
        }
      }}
      onClick={e=>{ // Ctrl+click to open Wiki
        if (isWiki && e.ctrlKey && e.button===0 && valueState) {
          const url = 'https://zh.dict.naver.com/#/search?query='+valueState.trim().replace(/ /g,'_')
          window.open(url, '_blank')
        }
      }}
      style={css}
      className={'update-' + updateState[0]}
      title={isWiki&&valueState?`Ctrl+click to visit ${valueState.trim()}`:valueState}
      {...params}
    />
  </TD>
}


/**
 * @param {Object} props
 * @param {string} props.rowID
 * @param {Function} props.tmpDelete React hook callback: to hide row
 * @param {Function} props.tmpUndelete React hook callback: to hide row
 */
export function DeleteBtn({rowID,tmpDelete,tmpUndelete}){
  return <TD>
  <input key='rubbish-bin'
    type='button'
    value='🗑️'
    title="Delete row"
    onClick={async _=>{
      if(confirm("Are you sure to delete this row?\nIt will be gone forever!")){
        tmpDelete()
        const ret = await dlt(rowID)
        if(!ret){
          switch(ret){
            case NaN:
              alert('[304 ERROR] The row to delete does not exist.')
              break
            case null:
              alert('[500 Internal Server Error]\nFailed to delete row.')
              break
            default:
              console.error("[Thisoe - Func ERROR] ret: ",ret)
          }
          tmpUndelete()
        }
      }
    }}
  /></TD>
}