const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
describe("Token contract", function () {

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    



    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("charityContract");
        [owner, addr1, addr2] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        hardhatToken = await Token.deploy();
      });

      describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
    
        // If the callback function is async, Mocha will `await` it.
        it("Should set the right owner", async function () {
          // Expect receives a value, and wraps it in an Assertion object. These
          // objects have a lot of utility methods to assert values.
    
          // This test expects the owner variable stored in the contract to be equal
          // to our Signer's owner.
          expect(await hardhatToken.owner()).to.equal(owner.address);
        });
      });

    describe("Transactions", function() {
        it("Should invest tokens", async function() {
        // Transfer 50 tokens from owner to addr1
            await hardhatToken.invest({value:50});
            expect(await hardhatToken.balanceOf()).to.equal(50);
        });

        /*it("Should send tokens to another addr", async function() {
            // Transfer 50 tokens from owner to addr1
            await hardhatToken.sendMoney(addr2.address, ethers.utils.parseUnits("1", "ether"));

            const addr2Balance = await hardhatToken.connect(addr2).balanceOf();
            expect(addr2Balance).to.equal(1);
        });*/
    });

    describe("Investors", function() {
        it("Should contain all investors", async function() {
        // Transfer 50 tokens from owner to addr1
            await hardhatToken.invest({value:10});
            a = [owner.address]
            await hardhatToken.connect(addr1).invest({value:10});
            a.push(addr1.address)
            b = await hardhatToken.showInvestors()
            //console.log(await hardhatToken.showInvestors())
            //console.log(a)
            assert.deepEqual(a,b)
            //expect(await hardhatToken.showInvestors()).to.eventually.include.all.members(a);
        });
        it("Should contain all charity of defined investor", async function() {
            // Transfer 50 tokens from owner to addr1
                await hardhatToken.invest({value:10});
                sum = 10
                await hardhatToken.invest({value:10});
                sum = 20
                await hardhatToken.connect(addr1).invest({value:10});
                
                expect(await hardhatToken.showAllInvestementsByAddress(owner.address)).to.equal(sum);
            });
        
    });


});
