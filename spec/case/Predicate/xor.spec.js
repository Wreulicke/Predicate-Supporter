var module=require('../../../lib/Predicate')
var P=module.Predicate
describe("test",function(){
  it("XOR Chained Test",function(){
    var predicate=P(()=>true).XOR(()=>false)
    expect(predicate()).toBe(true)
  })
  it("XOR Chained Test:2",function(){
    var predicate=P((x)=>x%2===0).XOR((x)=>false)
    expect(predicate(6)).toBe(true)
  })
  it("XOR Predicate Nested Test",function(){
    var count=0;
    var odd=P((x)=>{count++;return false})
    var is3Times=P((x)=>x%3===0)
    var predicate=odd.XOR(is3Times)
    expect(predicate(3)).toBe(true)
    expect(count).toBe(2)
  })
})