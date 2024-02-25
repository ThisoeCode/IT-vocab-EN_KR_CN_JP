'use client'
import {useEffect,useState} from "react"
import {tableConfig} from "@/_serv/_config"
import {put,up} from "./_use-server"
import Input from "./InputField"
import TR, {TD} from "./_table"

export default function New(){
  // 1. EMPTY DATA OBJ
  const emptyData =_=>{
    let obj = {}
    tableConfig.th.forEach(v=>{
      obj = {...obj, [v]:''}
    })
    return obj
  }

  // 2. SET STATES
  const [dataState, setData] = useState(emptyData())
  const [tempRow,setTempRows] = useState([])

  // 3. Customized TR
  const newTR =(content=tableConfig.th)=>{
    let inputs = []
    content.forEach((v,i)=>{
      v==='🗑️'
      ? inputs.push(
        <TD key='rubbish-bin'
          style={{cursor:'not-allowed'}}
        />)
      : inputs.push(
        <Input key={i}
          name={v}
          _value={dataState[v]}
          _post={false}
          isWiki={v==='wiki'}
          _change={e=>{
            setData(prev=>({...prev,
              [v]: e.target.value
            }))
          }}
        />)
    })
    return inputs
  }
  // newTR STATE
  const [newRow,resetNewRow] = useState(newTR())

  // 4. EFFECT: alert when not submitted & leaving
  const hasFilledField =_=>{
    for (const key in dataState) {
      if (dataState.hasOwnProperty(key) && dataState[key].trim() !== ''){
        return true
      }
    }
    return false
  }
  useEffect(_=>{
    const preventUnsave =e=>{
      if (hasFilledField()){
        e.preventDefault()
        e.returnValue = '' // for legacy browsers
        return 'Reload/leave site?\nThe new row is unsaved.'
      }
    }
    window.addEventListener('beforeunload', preventUnsave)
    return _=>{ window.removeEventListener('beforeunload', preventUnsave) }
  },[dataState])

  // 5. EFFECT: clear all inputs after submit
  useEffect(_=>{
    document.querySelectorAll('.new input')
      .forEach(field=>{
        field.value = ''
      })
  },[newRow])

  ///////
  return <><form className="new tr"
    action={_=>{
      if(hasFilledField()){
        let tempData = dataState

        // clear the new-row
        setData(emptyData())
        resetNewRow(newTR())

        // POST
        const ret = put(tempData)
        (ret===null)
          ? alert('[500 Internal Server Error]\nFailed to add row.')
          : setTempRows(prev=>[...prev,(
            (_=>{
              return <TR key={'tmpR_'+tempRow.length}
                id={ret}
                ctnt={tempData}
                post={up}
              />
            })()
          )])
      }
    }}
  /*form*/>{newRow}</form>
  <i id="temp-rows">{tempRow}</i>
  </>
}