import{convertConfig}from"./_config"
import{v4}from"uuid"

/** API URL for `fetch()` */
export const API = process.env.SELF_DOMAIN_URL+'/serv/'
/** HTTP JSON type */
export const headJ = {'Content-Type':'application/json'}



// CONVERTERS
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
    // Ignore falsy (`null`)
    if(!convertConfig[key]){continue}
    // General convert
    finalObj[convertConfig[key]] = 
      inObj.hasOwnProperty(key) ? inObj[key] : ''
  }
return finalObj
}


export function convertPatch(inObj){
  const finalObj = {}
  for (const x in convertConfig) {
    for (const y in inObj) {
      if(convertConfig[x]===y){
        finalObj[x] = inObj[convertConfig[x]].trim()
      }
    }
  }
if(finalObj){return finalObj}
throw new Error('[Thisoe FuncError] Function `convertPatch`: the key of inputted object cannot be found in `convertConfig` lib.')
}


export const ridToHid = rid=>{return 'r'+rid}
export const hidToRid = hid=>{
  if(hid.charAt(0)==='r'){return hid.slice(1)}
  else throw new Error('[Thisoe FuncError] Function `idToRid` needs a valid Thisoe Rid.')
}



// ROUTE LIB
import{NextRequest,NextResponse}from"next/server"

/** NextResponse.json */
export const NJ =_=>{ return NextResponse.json(_) }

/** @param {NextRequest} req */
const t1 = req=>{
  let ip = req.headers.get('x-forwarded-for')
  if(['::1',null,'127.0.0.1'].includes(ip)){
    ip='localhost'
  }else{
    ip=ip?ip.trim():'0.0.0.0'
  }
  let geo = req.headers.get('x-real-ip')
  geo=geo?geo.trim():'--'
  console.log(`\n[Thisoe API_LAUNCH 100] FromIP: ${ip} [${geo}]`)
  return void 1
}
const t2 = 'Thisoe msg::'
const t3 = 'Thisoe WARNING::'
const t45 = 'Thisoe FATAL::'
const t500 =_=>{return `[${t45+_} 500] UNKNOWN ERROR!!!!!!!`}
const NJ500 = NJ({},{status:500})
export const servTitle = {t1,t2,t3,t45,t500,NJ500}