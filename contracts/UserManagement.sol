// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract UserManagement {
    struct UserDetail {
        address addr;
        string name;
        string password;
        bool isUserLoggedIn;
    }

    mapping(address => UserDetail) user;

    function register(
        address _address,
        string memory _name,
        string memory _password
    ) public returns (bool) {
        require(user[_address].addr != msg.sender);
        user[_address].addr = _address;
        user[_address].name = _name;
        user[_address].password = _password;
        user[_address].isUserLoggedIn = false;
        return true;
    }

    function login(
        address _address,
        string memory _password
    ) public returns (bool) {
        if (
            keccak256(abi.encodePacked(user[_address].password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            user[_address].isUserLoggedIn = true;
            return user[_address].isUserLoggedIn;
        } else {
            return false;
        }
    }

    function checkIsUserLogged(address _address) public view returns (bool) {
        return (user[_address].isUserLoggedIn);
    }

    function logout(address _address) public {
        user[_address].isUserLoggedIn = false;
    }
}
