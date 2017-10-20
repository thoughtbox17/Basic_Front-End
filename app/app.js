(function () {
// Initialize Firebase
  const config = {
    apiKey: "AIzaSyCs0IBg4Dj3Gbn5z4TRuxTLw27DJgQCKUE",
    authDomain: "thought-box-mu.firebaseapp.com",
    databaseURL: "https://thought-box-mu.firebaseio.com",
    projectId: "thought-box-mu",
    storageBucket: "thought-box-mu.appspot.com",
    messagingSenderId: "253397407909",
  };
  firebase.initializeApp(config);

//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnCreate = document.getElementById('btnCreate');

//Add login event
btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add signup event
btnCreate.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add event listener
firebase.auth().onAuthStatusChanged(firebaseUser => {
    if(firebaseUser)
        {
            console.log(firebaseUser);
        }
    else {
        console.log('not logged in');
    }
});
    
    
    
}());