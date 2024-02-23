'use client'
import {useEffect,useState} from "react"
import {tableConfig} from "@/_serv/_config"
import {put} from "./_server"
import Input from "./InputField"

export default function New(){
  const emptyData =_=>{
    let obj = {}
    tableConfig.th.forEach(v=>{
      obj = {...obj, [v]:''}
    })
    return obj
  }
  const [dataState, setData] = useState(emptyData())

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
        e.returnValue = '' // For legacy browsers
        return 'Reload/leave site?\nThe new row is unsaved.'
      }
    }
    window.addEventListener('beforeunload', preventUnsave)
    return _=>{ window.removeEventListener('beforeunload', preventUnsave) }
  },[dataState])

  // Customized TR
  let inputs = []
  const newTR =_=>{
    tableConfig.th.forEach((v,i)=>{
      v=='🗑️'?(_=>{
        inputs.push(<i key='abandoned'
          className="block"
          style={{cursor:'not-allowed'}}
        />)
      })() : (_=>{
        inputs.push
        (<Input key={i}
          name={v}
          value={dataState[i]}
          _post={false}
          isWiki={v==='wiki'}
          _change={(e)=>{
            setData(prev=>({...prev,
              [v]: e.target.value
            }))
          }}
        />)
      })()
    })
  }
  newTR()

  return <form className="new tr"
    action={_=>{
      if(hasFilledField()){
        let tempData = dataState
        setData(emptyData())
        const ret = put(tempData)
        console.log(ret) /** @todo del console.log */
        if(ret===false){
          alert('[500 Internal Server Error]\nFailed to add row.')
        }else{
          /** @todo Add temp row `ret` under */
        }
      }
    }}
  > {inputs} </form>
}