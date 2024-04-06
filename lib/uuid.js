import{v4}from"uuid"
export default class uuid{
  constructor(){
    this.new=v4()
    this.short=uuid.shorten(this.new)
  }
  static shorten(_){return _.slice(0,8)}
}