// ---------------- PACKAGES ---------------- //
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { 
    getFirestore,
    doc, 
    getDoc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// ---------------- HTML THINGS ---------------- //
const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");
const logoutBtn = document.querySelector("#logout-btn");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginSection = document.querySelector(".login-container");
const loggedInSection = document.querySelector(".logged-in");
const data = document.querySelector("#data");
const googleBtn = document.querySelector("#google-btn");
const facebookBtn = document.querySelector("#facebook-btn");
const twitterBtn = document.querySelector("#twitter-btn");
const githubBtn = document.querySelector("#github-btn");
const updateBtn = document.querySelector("#update-data");
const paisInput = document.querySelector("#paisInput");
const nicknameInput = document.querySelector("#nicknameInput");
const showMap = document.querySelector("#show-map");
const closeMap = document.querySelector("#close-map");
const mapDiv = document.querySelector("#map");

// ---------------- FIREBASE APP CONFIG ---------------- //
const firebaseApp = initializeApp({
    apiKey: "AIzaSyD3EHwsI4BVT_Q8ro8ojTPYCvUNRPh81f8",
    authDomain: "fir-intro-83b54.firebaseapp.com",
    projectId: "fir-intro-83b54",
    storageBucket: "fir-intro-83b54.appspot.com",
    messagingSenderId: "1034291028507",
    appId: "1:1034291028507:web:9d49f4bf8d3315ef6c0ebe",
    measurementId: "G-2JTEH1G11C",
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGithub = new GithubAuthProvider();

// ---------------- AUTHENTIFICATION ---------------- //
// -- Registrarse -- //
signupBtn.addEventListener("click", function () {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // ..
        });
});

// -- Iniciar Sesion -- //
loginBtn.addEventListener("click", function () {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message);
        });
});

// -- Cerrar Sesion -- //
logoutBtn.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            loginSection.classList.remove("hide");
            loggedInSection.classList.add("hide");
        })
        .catch((error) => {
            console.log(error);
        });
});

// -- Google OAuth -- //
googleBtn.addEventListener("click", function(){
    signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})

// -- Facebook OAuth -- //
facebookBtn.addEventListener("click", function(){
    signInWithPopup(auth, providerFacebook)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
  
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });
})

// -- Facebook OAuth -- //
twitterBtn.addEventListener("click", function(){
    signInWithPopup(auth, providerTwitter)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
  });
})

// -- Github OAuth -- //
githubBtn.addEventListener("click", function(){
    signInWithPopup(auth, providerGithub)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
})

// -- Observador -- //
onAuthStateChanged(auth, async (user) => {
    if (user) {
        data.innerHTML = `<h1 style="text-align: center">Mi cuenta</h1>`

        loginSection.classList.add("hide");
        loggedInSection.classList.remove("hide");

        if(user.displayName != null){
            data.innerHTML += `<p><strong>Nombre:</
            strong> ${user.displayName}</p>`;
        }
        data.innerHTML += `<p><strong>Email:</strong> ${user.email}</p>`;
        data.innerHTML += `<p><strong>Id:</strong> ${user.uid}</p>`;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            data.innerHTML += `<p><strong>Nickname:</strong> ${docSnap.data()["nickname"]}</p>`;
            data.innerHTML += `<p><strong>Pais:</strong> ${docSnap.data()["pais"]}</p>`;

            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

        updateBtn.addEventListener("click", async function(){
            if(nicknameInput.value != "" && paisInput.value != ""){
                await setDoc(doc(db, "users", user.uid), {
                    nickname: nicknameInput.value,
                    pais: paisInput.value
                });
    
                nicknameInput.value = "";
                paisInput.value = "";
    
                alert("Tus datos se han actualizado correctamente");
            } else {
                alert("No dejes ningun input vacio!");
            }
        })

        mapboxgl.accessToken = 'pk.eyJ1Ijoia2FsZG8iLCJhIjoiY2xkdnZlMTJrMDE5bDNwcWZrNHY3ZWw4cyJ9.KJlCqPRoA0svUiAxgj1CRw';
        const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: [-74.5, 40], 
        zoom: 9 
        });

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            });
            // Add the control to the map.
            map.addControl(geolocate);
            map.on('load', () => {
            geolocate.trigger();
        });

        console.log("User loged");
    } else {
        console.log("No user");
    }
});
