// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <=0.8.4;
pragma experimental ABIEncoderV2;

contract Notepad {
    struct note {
        string title;
        string content;
        string colour;
    }

    struct accountData {
        uint numberOfNotes;
        mapping (uint=>note) notes;
        bool exists;
    }

    mapping(bytes32 => accountData) public accounts;

    function fetch(bytes32 id) public view returns (string[] memory) {
        string[] memory temp = new string[](accounts[id].numberOfNotes*3);
        uint j=0;
        for(uint i=0; i<accounts[id].numberOfNotes; i++){
            temp[j]=(accounts[id].notes[i].title);
            j+=1;
            temp[j]=(accounts[id].notes[i].content);
            j+=1;
            temp[j]=(accounts[id].notes[i].colour);
            j+=1;
        }
        return temp;
    }

    function update (
        bytes32 id,
        string[] memory title,
        string[] memory content,
        string[] memory colour
    ) public{
        for(uint i=0; i<title.length; i++){
            accounts[id].notes[i] = note(title[i], content[i], colour[i]);
        }
        accounts[id].numberOfNotes = title.length;
    }
}
