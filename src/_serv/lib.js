import{convertConfig}from"./_config"
import{v4}from"uuid"

/** API URL for `fetch()` */
export const API = process.env.SELF_DOMAIN_URL+'/serv/'


export function convertToDb(inObj){
  const finalObj = {}
  // General convert
  for (const key in convertConfig) {
    finalObj[key] =
    inObj.hasOwnProperty(convertConfig[key]) ?
      inObj[convertConfig[key]].trim() :
      ''
  }
  // Special properties
  finalObj['createdtime'] = Date.now()
  finalObj['id'] = v4()
return finalObj
}


export function convertToTr(inObj){
  const finalObj = {}
  for (const key in convertConfig) {
    // Ignore `null`
    if(!convertConfig[key]){continue}
    // General convert
    finalObj[convertConfig[key]] = 
      inObj.hasOwnProperty(key) ? inObj[key] : ''
  }
return finalObj
}


export function convertPatch(inObj){
  const fullObj = convertToDb(inObj)
  const finalObj = {}
  for(const key in fullObj){
    if(fullObj[key] && key !== "createdtime"){
      finalObj[key] = fullObj[key]
    }
  }
return finalObj
}