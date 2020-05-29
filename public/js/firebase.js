// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDPHGwivqlWr43tdV7BtC_xZmUMWvHtxGk",
  authDomain: "profile-sagarsalyan.firebaseapp.com",
  databaseURL: "https://profile-sagarsalyan.firebaseio.com",
  projectId: "profile-sagarsalyan",
  storageBucket: "profile-sagarsalyan.appspot.com",
  messagingSenderId: "561073738805",
  appId: "1:561073738805:web:791071b286fec7a3d74d7c",
  measurementId: "G-8YT0G3X86Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Reference Message collection
var messageRef = firebase.database().ref('message');

const submitBtn = document.getElementById('submitBtn');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const message = document.getElementById('message');

// const db = firestore.collection("responseData");

submitBtn.addEventListener('click', function(e){
  e.preventDefault();
  var firstnameInput = firstname.value;
  var emailInput = email.value;
  var messageInput = message.value;

  var emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  if(firstnameInput == "" || emailInput == "" || !emailValid.test(emailInput) || messageInput == "")
  {
    $('#invalidModal').modal("show");
    return;
  }

  var newMessageRef = messageRef.push();
  newMessageRef.set({
    name: firstnameInput,
    email: emailInput,
    message: messageInput
  }).then(function(){
    $('#successModal').modal("show");
    firstname.value = '';
    email.value = ''
    message.value = ''
  }).catch(function(){
    $('#errorModal').modal("show");
  });
})
