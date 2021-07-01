// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <=0.8.4;
pragma experimental ABIEncoderV2;

contract Notepad {
    struct note {
        string title;
        string content;
    }

    struct accountData {
        uint256 numberOfNotes;
        mapping(uint256 => note) notes;
        bool exists;
    }

    mapping(bytes32 => accountData) public accounts;

    function fetch(bytes32 id) public view returns (string[] memory) {
        string[] memory temp = new string[](accounts[id].numberOfNotes * 2);
        uint256 j = 0;
        for (uint256 i = 0; i < accounts[id].numberOfNotes; i++) {
            temp[j] = (accounts[id].notes[i].title);
            j += 1;
            temp[j] = (accounts[id].notes[i].content);
            j += 1;
        }
        return temp;
    }

    function update(
        bytes32 id,
        string[] memory title,
        string[] memory content
    ) public {
        for (uint256 i = 0; i < title.length; i++) {
            accounts[id].notes[i] = note(title[i], content[i]);
        }
        accounts[id].numberOfNotes = title.length;
    }
}
