const People = artifacts.require("People");
const truffleAssert = require("truffle-assertions");

contract ("People", async function(){

let instance;

before(async function(){
  instance = await People.deployed();
});

  it("should not create a person over 150 years", async function(){
      await truffleAssert.fails(instance.createPerson("Bon", 200, 190, {value: web3.utils.toWei("1", "ether")}), truffleAssert.ErrorType.REVERT);
  });
  it("should not create a person without payment", async function(){
      await truffleAssert.fails(instance.createPerson("Bon", 50, 190, {value: 1000}), truffleAssert.ErrorType.REVERT);
  });
  it("should set the senior status correctly", async function(){
      await instance.createPerson("Bon", 65, 190, {value: web3.utils.toWei("1", "ether")});
      let result = instance.getPerson();
      console.log("result = " + result.senior);
      assert(result.senior === true,"senior level not set");
  });
/*  it("should not allow non owners to delete a person", async function(){
    let instance = await People.deployed();
    await instance.createPerson("Lisa", 12, 190, {from: accounts[1], value: web3.utils.toWei("1", "ether")});
    await truffeAssert.fails(instance.deletePerson(accounts[1], {from: accounts[1]}));
  })*/

});
