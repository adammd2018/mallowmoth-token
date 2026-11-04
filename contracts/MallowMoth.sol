// SPDX-License-Identifier: MIT
pragma solidity 0.8.38;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MallowMoth is ERC20 {
    address public constant INITIAL_HOLDER = 0x5bd89195D2fc107bF7259eF3510c9c24b8E10a93;
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    constructor() ERC20("MallowMoth", "MALOTH") {
        _mint(INITIAL_HOLDER, INITIAL_SUPPLY);
    }
}
