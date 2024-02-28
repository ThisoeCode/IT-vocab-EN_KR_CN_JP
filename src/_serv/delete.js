import { ObjectId } from "mongodb"
import insu from "./_insu"

export default async function DEL(rid){
  const {db} = await insu()
  const res = ObjectId.isValid(rid)
    ? await (db.collection(process.env.DB_COLL))
      .deleteOne({_id: new ObjectId(rid)})
    : NaN
  if(res){
    if(res.deletedCount===1){
      console.log(`[Thisoe msg] Row [${rid}] deleted.`)
      return 1
    }else{
      console.log('[Thisoe WARNING] No row was deleted - while trying to delete row ['+rid)
      return 0
    }
  }else{
    console.log(`[Thisoe WARNING] Row [${rid}] was NOT deleted - not a valid MongoDB ObjectID!!!`)
    return NaN
  }
}