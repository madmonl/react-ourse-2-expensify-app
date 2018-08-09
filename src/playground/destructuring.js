//
// Object Destructuring
//

// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const { name = 'Anonymous', age } = person;
// console.log(`${name} is ${age}`);

// const { city, temp: temperature } = person.location;
// if (city && temperature){
//     console.log(`It's ${temperature} in ${city}.`);
// }


const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const { name: publisherName = 'Self-Publisher' } = book.publisher
console.log(publisherName);

//
//Array Destructuring
//

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvanya', '19147'];
//For an empty array we would have gotten New York printed to the screen
const [, city, state = 'New York'] = address;
console.log(`you are in ${state}.`);

const item = ['Coffee (hot)', '2.00$', '2.50$', '2.75$'];
const [selection, , mediumPrice ] = item;
console.log(`A medium ${selection} costs ${mediumPrice}`);