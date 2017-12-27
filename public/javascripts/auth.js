function toggleSignInGoogle() {
    console.log('Google Toggle')

    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    }
    document.getElementById('Google-signin').disabled = true;
}

function toggleSignInGithub() {
    console.log('Github Toggle')

    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GithubAuthProvider();

        provider.addScope('repo');

        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
        var provider = new firebase.auth.GithubAuthProvider();

        provider.addScope('repo');

        firebase.auth().signInWithRedirect(provider);
    }
}

function signOut() {
    console.log('Sign Out Toggle')

    document.getElementById("Signout").style.visibility = "hidden";

    firebase.auth().signOut();
    $('.signin-page').fadeIn();
}

function initApp() {
    $('.signin-page').hide();

    firebase.auth().getRedirectResult().then(function (result) {
        console.log(' firebase callback');

        if (result.credential) {
            console.log('auth');

            var token = result.credential.accessToken;
            var credential = result.credential;
            var user = result.user;
            document.getElementById('Signout').style.display = 'visible';
        } else {
            console.log('no auth');
            $('.signin-page').fadeIn();

        }
    }).catch(function (error) {
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        console.log(errorMessage);

        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
        }
    });

    // Listening for auth state changes.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('user');
            document.getElementById("Signout").style.visibility = "visible";
            $('.signin-page').fadeOut();
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
        } else {
            document.getElementById("Signout").style.visibility = "hidden";
        };
    });

    document.getElementById('Google-signin').addEventListener('click', toggleSignInGoogle, false);
    document.getElementById('Github-signin').addEventListener('click', toggleSignInGithub, false);
    document.getElementById('Signout').addEventListener('click', signOut, false);

}



window.onload = function () {
    initApp();
};
