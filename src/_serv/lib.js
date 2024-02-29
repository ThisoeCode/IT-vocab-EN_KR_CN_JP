import{convertConfig}from"./_config"
import{v4}from"uuid"

/** API URL for `fetch()` */
export const API = process.env.SELF_DOMAIN_URL+'/serv'


export function convertToDb(inObj){
  const finalObj = {id:v4()}
  // General convert
  for (const key in convertConfig) {
    finalObj[key] =
    inObj.hasOwnProperty(convertConfig[key]) ?
      inObj[convertConfig[key]].trim() :
      ''
  }
  // Special properties
  if ('createtime' in convertConfig){
    finalObj['createtime'] = Date.now()
  }
return finalObj
}


export function convertToTr(inObj){
  const finalObj = {}
  for (const key in convertConfig) {
    if(!convertConfig[key]){continue}
    finalObj[convertConfig[key]] = 
      inObj.hasOwnProperty(key) ? inObj[key] : ''
  }
return finalObj
}
