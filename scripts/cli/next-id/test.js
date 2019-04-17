let getId = require('./index').getId;

// callback
getId((id) => {
    console.log(id);
});

// promise
getId().then((id) => {
    console.log(id);
});
