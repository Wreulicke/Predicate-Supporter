var P=require('../../../lib/Predicate').Predicate
describe("test",function(){
  it("OR Chained Test",function(){
    var predicate=P(()=>true).OR(()=>{throw "not reached here"})
    expect(predicate()).toBe(true)
  })
  it("OR Chained Test:2",function(){
    var predicate=P((x)=>x%2===0).OR((x)=>{throw "not reached here"})
    expect(predicate(6)).toBe(true)
  })
  it("OR Predicate Nested Test",function(){
    var odd=P((x)=>x%2===1)
    var is3Times=P((x)=>{throw "not reached here"})
    var predicate=odd.OR(is3Times)
    expect(predicate(3)).toBe(true)
  })
})