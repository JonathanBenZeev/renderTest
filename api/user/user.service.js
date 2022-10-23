
const fs = require('fs')
const users = require('../../data/user.json')

module.exports = {
    query,
    getById,
    _save,
    remove,
    checkLogin

}


function _creatUser(fullName, username, password) {
    return {
        "_id": "u101",
        "fullName": "Richard",
        "username": "dick",
        "password": "secret",
        "createdAt": 1598948573211
    }
}

function save(userName) {
    const user = {"userName": userName}
    users.unshift(user);
    _saveUsersToFile();
    return Promise.resolve(user);
}

function _save(user) {
    user.isAdmin = false
    user._id = _makeId()
    user.createdAt = Date.now();
    users.unshift(user);
    return _saveToFile().then(() => user)
}



function _saveToFile() {
    return new Promise((resolve, reject) => {
        const str = JSON.stringify(users, null, 2);
        fs.writeFile('data/user.json', str, function (err) {
            if (err) {
                return reject(new Error('Cannot update User file'));
            }
            resolve()
        });
    });
}


///////////////////////////////////
function checkLogin({username, password}) {
    var userToReturn = users.find(user => user.username === username && user.password === password)
    if (userToReturn) {
        userToReturn = {...userToReturn}
        delete userToReturn.password;
    }
    return Promise.resolve(userToReturn)
}
///////////////////////////////////


function query(filterBy) {
    var usersToReturn = users;
    if (filterBy.q) {
        usersToReturn = users.filter(user => user.title.includes(filterBy.q))
    }
    return Promise.resolve(usersToReturn);
}

function getById(_id) {
    const user = users.find(user => user._id === _id)
    if (!user) return Promise.reject('Uknown User')

    return Promise.resolve(user);
}
function remove(_id) {
    const idx = users.findIndex(user => user._id === _id)
    users.splice(idx, 1);
    _saveUsersToFile()
    return Promise.resolve();
}

// function save(user) {
//     if (user._id) {
//         const idx = users.findIndex(currUser => currUser._id === user._id)
//         // user.updatedAt = Date.now();
//         users[idx] = { ...users[idx], ...user }
//     } else {
//         user.createdAt = Date.now();
//         user._id = _makeId();
//         users.unshift(user);
//     }
//     _saveUsersToFile();
//     return Promise.resolve(user);
// }


// CRUDL: Create, Read, Update, Delete, List

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveUsersToFile() {
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 2));
}
