window.onload = function() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCqqZjlas5HMsA7fRR2wC0MzEOSnk1Gxys",
        authDomain: "chatting-d0fd6.firebaseapp.com",
        projectId: "chatting-d0fd6",
        storageBucket: "chatting-d0fd6.appspot.com",
        messagingSenderId: "777836236140",
        appId: "1:777836236140:web:15d981cb77f14909533749",
        measurementId: "G-8NDQHQKBL7"
    };


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database()


    class MEME_CHAT {

        addGroup() {
            var formButton = document.getElementById('add_group');
            var form = document.getElementById('form');

            formButton.onclick = function(e) {
                e.preventDefault();

                if (formButton.innerHTML == 'done') {
                    console.log('ooooooooo')
                    return;
                }

                var nameGroup = e.target.form.querySelector("input[id='nameGroup']").value
                var addedUser = e.target.form.querySelector("input[id='addedUser']").value

                var users = e.target.form.querySelectorAll("input[id='user']:checked")

                var usersName = [];

                users.forEach((u) => {
                    usersName.push(u.name)
                })

                // var path = db.ref('chats/');


                db.ref('chats/' + `${nameGroup}`).set({
                    addedUser: addedUser,
                    users: usersName,
                    name: nameGroup
                })

                formButton.innerHTML = 'done';
                formButton.style.background = '#a6adb4';

                form.reset();
                var input = document.getElementById('nameGroup');

                input.onkeyup = function() {
                    formButton.innerHTML = 'ADD';
                    formButton.style.background = '#34495e'
                }


                return false;
            }

        }
    }



    app = new MEME_CHAT()
        // if this is a new user then take them to the home screen
    if (localStorage.getItem('user') == null) {
        app.home()
    } else {
        // else. They are a return user.
        // app.chat()
        app.addGroup();
    }



}