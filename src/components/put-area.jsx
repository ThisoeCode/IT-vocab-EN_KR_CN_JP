'use client'
import {useEffect,useState} from "react"
import {tableConfig} from "@/_serv/_config"
import {put} from "./_server"
import Input from "./InputField"

export default function New(){
  // 1. SET STATES
  const emptyData =_=>{
    let obj = {}
    tableConfig.th.forEach(v=>{
      obj = {...obj, [v]:''}
    })
    return obj
  }
  const [dataState, setData] = useState(emptyData())
  const [tempRow,addTempRow] = useState([])

  // 2. EFFECT: pop-up when not submitted & leaving
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

  // 3. EFFECT: clear all inputs after submit
  

  // Customized TR
  let inputs = []
  const newTR =_=>{
    tableConfig.th.forEach((v,i)=>{
      v=='🗑️'?(_=>{
        inputs.push(<i key='rubbish-bin'
          className="block"
          style={{cursor:'not-allowed'}}
        />)
      })() : (_=>{
        inputs.push
        (<Input key={i}
          name={v}
          value={dataState[v]}
          _post={false}
          isWiki={v==='wiki'}
          /** input:onChange */
          _change={e=>{
            setData(prev=>({...prev,
              [v]: e.target.value
            }))
          }}
        />)
      })()
    })
  }
  newTR()

  return <><form className="new tr"
    action={async _=>{
      if(hasFilledField()){
        let tempData = dataState
        setData(emptyData())
        const ret = await put(tempData)
        if(ret===false){
          alert('[500 Internal Server Error]\nFailed to add row.')
        }else{
          addTempRow(prev=>[...prev,ret])
        }
      }
    }}
  > {inputs} </form>
  <i id="temp-rows">{tempRow}</i>
  </>
}