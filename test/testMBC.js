const MbcERC20 = artifacts.require("MbcERC20");

contract("MbcERC20", accounts => {
    let One = Math.pow(10, 18);

    let MbcLevel1 = One * 9900;
    let MbcLevel2 = MbcLevel1 + One * 445500;
    let MbcLevel3 = MbcLevel2 + One * 1782000;
    
    it("MbcERC20 should change owner address.", async () => {
        let instance = await MbcERC20.deployed();
        let owner_address = await instance.owner_address.call();
        assert.equal(
            owner_address, accounts[0],
            "MbcERC20 owner address NOT match."
        );
        await instance.changeOwner(accounts[1]);
        owner_address = await instance.owner_address.call();
        assert.equal(
            owner_address, accounts[1],
            "MbcERC20 owner address NOT match."
        );
    });
    it("MbcERC20 should change moneyer address.", async () => {
        let instance = await MbcERC20.deployed();
        let moneyer_address = await instance.moneyer_address.call();
        assert.equal(
            moneyer_address, accounts[0],
            "MbcERC20 moneyer address NOT match."
        );
        await instance.changeMoneyer(accounts[1], {from: accounts[1]});
        moneyer_address = await instance.moneyer_address.call();
        assert.equal(
            moneyer_address, accounts[1],
            "MbcERC20 moneyer address NOT match."
        );
    });
    it("MbcERC20 should mint", async () => {
        let instance = await MbcERC20.deployed();
        let totalSupply = await instance.totalSupply.call();
        assert.equal(
            totalSupply, 0,
            "MbcERC20 totalSupply NOT match."
        );
        let mint_value = 100 * One //100000000000000000000
        await instance.mint(accounts[2], "0x"+mint_value.toString(16), {from: accounts[1]});
        totalSupply = await instance.totalSupply.call();
        assert.equal(
            totalSupply.toString(), mint_value * 1.05,
            "MbcERC20 totalSupply NOT match."
        );
        let balance = await instance.balanceOf(accounts[2]);
        assert.equal(
            balance.toString(), mint_value,
            "MbcERC20 balance NOT match."
        );
        let moneyer_address = await instance.moneyer_address.call();
        let seig = await instance.balanceOf(moneyer_address);
        assert.equal(
            seig.toString(), mint_value * 0.05,
            "MbcERC20 balance NOT match."
        );
    });

    it("MbcERC20 should transfer", async () => {
        let instance = await MbcERC20.deployed();
        let transfer_value = 100 * One //100000000000000000000
        await instance.transfer(accounts[3], "0x"+transfer_value.toString(16), {from: accounts[2]});

        let balance = await instance.balanceOf(accounts[2]);
        assert.equal(
            balance.toString(), 0,
            "MbcERC20 transfer sender NOT match."
        );
        balance = await instance.balanceOf(accounts[3]);
        assert.equal(
            balance.toString(), transfer_value,
            "MbcERC20 transfer recviver NOT match."
        );
    });

    it("MbcERC20 should burn", async () => {
        let instance = await MbcERC20.deployed();
        let balance = await instance.balanceOf(accounts[3]);
        assert.equal(
            balance.toString(), 100 * One,
            "MbcERC20 balance NOT match."
        );
        await instance.burn(balance, {from: accounts[3]});
        balance = await instance.balanceOf(accounts[3]);
        assert.equal(
            balance.toString(), 0,
            "MbcERC20 burn failed."
        );
    });
});