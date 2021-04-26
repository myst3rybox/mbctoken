// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
/**
 * @title MysteryBox ERC20 token
 *
 * @dev Implementation of the mystery box token.
 * @dev https://github.com/myst3rybox/solidity
*/
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../libraries/SafeMath.sol";
contract MbcErc20 is ERC20 {
    using SafeMath for uint256;

    uint public INITIAL_SUPPLY = 0;
    uint public MAX_SUPPLY = 21 * (10 ** 26);
    uint public TOTAL_SUPPLY = 0;
    address public owner_address;
    address public moneyer_address;
    /*
        Events
    */
    // Called when owner changed.
    event ChangeOwner(address _newOwner);
    // Called when monyer changed.
    event ChangeMoneyer(address _newMoneyer);
    // Called when MBC mint.
    event Mint(address _to, uint256 _value);
    // Called when MBC burnt.
    event Burn(address _from, uint256 _value);
    /*
        Modifyer
    */
    modifier onlyOwner(){
        require(msg.sender == owner_address, "Not owner");
        _;
    }
    /*
        Functions
    */
    constructor() ERC20("Mystery Box Coin", "MBC") {
        owner_address = msg.sender;
        moneyer_address = msg.sender;
    }
    /**
    * @dev mint MBC to user address.
    * @param _to The address of user.
    * @param _value The quantity of MBC.
    */
    function mint(address _to, uint256 _value) 
    public onlyOwner{
        require(address(0) != _to, "Invalid address");
        uint256 total = _value.mul(21).div(20);    // include 5% seignorage 
        require(total.add(totalSupply()) <= MAX_SUPPLY, "Total supply is Overflow");
        _mint(_to, _value);
        emit Mint(_to, _value);
        _mint(moneyer_address, total.sub(_value));
        emit Mint(moneyer_address, total.sub(_value));
    }
    /**
    * @dev Burn MBC from user address.
    * @param _value The quantity of MBC.
    */
    function burn(uint256 _value) 
    public {
        _burn(msg.sender, _value);
        emit Burn(msg.sender, _value);
    }
    /**
    * @dev Change owner to a new address.
    * @param _newOwner The address of new owner.
    */
    function changeOwner(address _newOwner) 
    public onlyOwner{
        require(address(0) != _newOwner, "Invalid user address");
        owner_address = _newOwner;
        emit ChangeOwner(_newOwner);
    }
    /**
    * @dev Change moneyer to a new address.
    * @param _newMoneyer The address of new moneyer.
    */
    function changeMoneyer(address _newMoneyer) 
    public onlyOwner{
        require(address(0) != _newMoneyer, "Invalid user address");
        moneyer_address = _newMoneyer;
        emit ChangeMoneyer(_newMoneyer);
    }
}