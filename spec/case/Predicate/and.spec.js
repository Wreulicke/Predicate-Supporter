var P=require('../../../lib/Predicate').Predicate
describe("test",function(){
  it("AND Chained Test",function(){
    var predicate=P(()=>true).AND(()=>true)
    expect(predicate()).toBe(true)
  })
  it("AND Chained Test:2",function(){
    var predicate=P((x)=>x%2===0).AND((x)=>x%3==0)
    expect(predicate(6)).toBe(true)
  })
  it("AND Predicate Nested Test",function(){
    var odd=P((x)=>x%2===1)
    var is3Times=P((x)=>x%3===0)
    var predicate=odd.AND(is3Times)
    expect(predicate(3)).toBe(true)
  })
})