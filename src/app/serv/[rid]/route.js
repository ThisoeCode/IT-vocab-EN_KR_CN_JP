import{NextRequest,NextResponse}from"next/server"
import{NJ,servTitle as t,collection}from"../route"


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
        console.log(`[${t.t2}DELETE] Row [${id}] deleted.`)
        return NJ({},{status:200})
      }else{
        console.log(`[${t.t3}DELETE] No row was deleted - while trying to delete row [${id}].`)
        return NJ({},{status:304})
      }
    }else{
      console.log(`[${t4}DELETE] Row [${id}] was NOT deleted - `+'`res` error!')
      return NJ({},{status:403})
    }
  }catch(_){console.dir(_)}
}


/** 4.
 * UPDATE: change content of a cell
 * @param {NextRequest} req
 */
export async function PATCH(req,{params}){t.t1(req)
  const id = params.rid
  try{
    console.log(req.json()) // TODO DELETE log
    const res = await collection.updateOne(
      {id},
      {$set: req}
    )

    if (res.modifiedCount === 1) {
      console.log(`[${t2}UPDATE 200] ID[${documentId}] updated success.`)
      return true
    } else {
      console.log(`[${t3}UPDATE 304] ID[${documentId}] not found or no change.`)
      return false
    }
  }catch(_){console.dir(_)}
}
