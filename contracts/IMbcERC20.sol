// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
/**
 * @dev Interface of the Mystery box ERC20。
 */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IMbcERC20 is IERC20 {
    function mint(address _to, uint256 _value) external;
    function burn(uint256 _value) external;
    function changeOwner(address _owner) external;
    function changeMoneyer(address _moneyer) external;
}