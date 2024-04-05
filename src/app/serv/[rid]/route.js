import{NextRequest}from"next/server"
import{NJ,servTitle as t}from"@/_serv/lib"
import{collection}from"../route"


/** 3.
 * DEL: delete row
 * @param {NextRequest} req
 * @returns {string} params
 */
export async function DELETE(req,{params}){t.t1(req)
  try{
    const id = params.rid
    const res = await(await collection)
      .deleteOne({id})
    if(res){
      if(res.deletedCount===1){
        console.log(`[${t.t2}DELETE 200] Row [${id}] deleted.`)
        return NJ({},{status:200})
      }else{
        console.log(`[${t.t3}DELETE 304] No row was deleted - while trying to delete row [${id}].`)
        return NJ({},{status:304})
      }
    }else{
      console.log(`[${t4}DELETE 403] Row [${id}] was NOT deleted - `+'`res` error!')
      return NJ({},{status:403})
    }
  }catch(_){
    console.error(t.t500('DELETE'))
    console.dir(_)
    return t.NJ500
  }
}


/** 4.
 * UPDATE: change content of a cell
 * @param {NextRequest} req
 */
export async function PATCH(req,{params}){t.t1(req)
  const id = params.rid
  const doc = await req.json()
  try{
    const res = await(await collection).updateOne(
      {id},
      {$set: doc}
    )

      const keyName = Object.keys(doc).toString()
    if (res.modifiedCount === 1) {
      console.log(`[${t.t2}UPDATE 200] ID[${id}] KEY[${keyName}] updated success.`)
      return NJ({},{status:200})
    } else {
      console.log(`[${t.t3}UPDATE 304] ID[${id}] KEY[${keyName}] Not found or no change.`)
      return NJ({},{status:304})
    }
  }catch(_){
    console.error(t.t500('UPDATE'))
    console.dir(_)
    return t.NJ500
  }
}
