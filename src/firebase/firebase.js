// Takes all the named exports from firebase and puts them in
// a variable called firebase
import * as firebase from 'firebase';
// import expenses from '../tests/fixtures/expenses';


const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider;

export { firebase, googleAuthProvider, db as default };

// //child_removed
// db.ref('expenses')
// .on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child_changed
// db.ref('expenses')
// .on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child_added
// db.ref('expenses')
// .on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });


// db.ref('expenses')
// .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             ...childSnapshot.val(),
//             id: childSnapshot.key
//         });
//     });

//     console.log(expenses);
// });


// db.ref('expenses').push(expenses[0]);
// db.ref('expenses').push(expenses[1]);
// db.ref('expenses').push(expenses[2]);

// setTimeout(() => {
//     db.ref('expenses').push({
//         note: '',
//         amount: 200,
//         createdAt: 3000,
//         description: 'ssjaks'
//     })
// }, 6000);

// *** //
// Since firebase doesn't support arrays we use -push- to automatically 
// generate an id.

// db.ref().set({
//     name: 'liad',
//     age: 23,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     },
//     isSingle: false,
//     location: {
//         city: 'ashdod',
//         country: 'israel'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('This failed:', e);
// });

// db.ref().update({
//     stressLevel: 9,
//     'job/company': 'amazon',
//     'location/city': 'Seattle'
// });

// Unlike once - on listens to changes.
// const onValueChange = db.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('error fetching the data', e)
// });

// db.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// }, (e) => {
//     console.log('error adding subscription', e)
// });

// setTimeout(() => {
//     db.ref('age').set(28);
// }, 3500);

// setTimeout(() => {
//     db.ref('age').set(29);
// }, 7000);

// setTimeout(() => {
//     db.ref().off('value', onValueChange);
// }, 10500);

// setTimeout(() => {
//     db.ref('age').set(30);
// }, 12500);

// db.ref('location')
// .once('value')
// .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
// })
// .catch(() => {
//     console.log('error fetching data:', e);
// });