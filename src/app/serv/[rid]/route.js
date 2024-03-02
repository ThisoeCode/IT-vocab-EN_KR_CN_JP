import{NextRequest}from"next/server"
import{NJ,servTitle as t,collection}from"../route"


/** 3.
 * DEL: delete row
 * @param {NextRequest} req
 */
export async function DELETE(req,{rid}){t1
  const res = await(await collection)
    .deleteOne({id: rid})
  if(res){
    if(res.deletedCount===1){
      console.log(`[${t2}DELETE] Row [${rid}] deleted.`)
      return NJ({stat:1})
    }else{
      console.log(`[${t3}DELETE] No row was deleted - while trying to delete row [${rid}].`)
      return NJ({stat:0})
    }
  }else{
    console.log(`[${t4}DELETE] Row [${rid}] was NOT deleted - not a valid MongoDB ObjectID!!!`)
    return NJ({stat:NaN},{status:403})
  }
}


/** 4.
 * UPDATE: change content of a cell
 * @param {NextRequest} req
 */
export async function PATCH(req,{rid}){t.t1(req)
  console.log(req.json()) // TODO DELETE log
  const res = await collection.updateOne(
    {rid},
    {$set:req}
  )

  if (res.modifiedCount === 1) {
    console.log(`[${t2}UPDATE 200] ID[${documentId}] updated success.`)
    return true
  } else {
    console.log(`[${t3}UPDATE 304] ID[${documentId}] not found or no change.`)
    return false
  }

}
