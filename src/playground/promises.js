const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'liad',
            age: 23
        });
        reject('Something went wrong!');
    }, 5000);
});

promise.then((data) => {
    console.log('1', data);
    return 'chained';
}).then((str) => {
    console.log('some data', str);
}).catch((error) => {
    console.log('error:', error);
});