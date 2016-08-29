var module=require('../../../lib/Predicate')
var P=module.Predicate
describe("test",function(){
  it("Complex Chained Test",function(){
    var predicate=P(()=>true).AND(()=>true).OR(()=>{throw "not reached here"})
    expect(predicate()).toEqual(true)
  })
  it("Complex Chained Test:2",function(){
    var reached=false
    var predicate=P((x)=>x%2===0).OR((x)=>true).AND(()=>{
      reached=true;
      return true
    })
    expect(predicate(5)).toEqual(true)
    expect(reached).toEqual(true)
  })
  it("Complex Predicate Nested Test",function(){
    var odd=P((x)=>x%2===1)
    var is3Times=P((x)=>{throw "not reached here"})
    var predicate=module.AND(odd.OR(is3Times),odd)
    expect(predicate(3)).toEqual(true)
  })
})