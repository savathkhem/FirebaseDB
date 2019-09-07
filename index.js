var firebase = require('firebase').initializeApp({   
    serviceAccount: './services/fir-db-63777-service-account.json',
    databaseURL: 'https://fir-db-63777.firebaseio.com',
});

var message = {text: 'hey guys & gals & errybody else', timestamp: new Date().toString()};

var ref = firebase.database().ref().child('node-clint');
var logRef = ref.child('log');
var messagesRef = ref.child('message');
var messageRef = messagesRef.push(message);

logRef.child(messageRef.key).set(message);
logRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
    console.log('added', snap.val());
});
logRef.on('child_removed', function(snap) {
    console.log('removed', snap.val());
});
logRef.on('child_changed', function(snap) {
    console.log('changed', snap.val());
});

logRef.on('value', function(snap) {
    console.log('value', snap.val());
});