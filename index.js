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

    var users = [{
            id: 1,
            user: 'yaser',
            type: 'admin'

        },
        {
            id: 2,
            user: 'khalil',
            type: 'user'

        },
        {
            id: 3,
            user: 'mlm',
            type: 'super'
        },
    ]


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database()

    class MEME_CHAT {
        home() {
            document.body.innerHTML = ''
            this.create_title()
            this.create_join_form()
        }
        chat() {
            this.create_title()
            this.homeUser(true);
        }
        create_title() {
            var title_container = document.createElement('div')
            title_container.setAttribute('id', 'title_container')
            var title_inner_container = document.createElement('div')
            title_inner_container.setAttribute('id', 'title_inner_container')

            var title = document.createElement('h1')
            title.setAttribute('id', 'title')
            title.textContent = 'event plus'

            title_inner_container.append(title)
            title_container.append(title_inner_container)
            document.body.append(title_container)
        }
        create_join_form() {
            var parent = this;

            var join_container = document.createElement('div')
            join_container.setAttribute('id', 'join_container')
            var join_inner_container = document.createElement('div')
            join_inner_container.setAttribute('id', 'join_inner_container')

            var join_button_container = document.createElement('div')
            join_button_container.setAttribute('id', 'join_button_container')

            var join_button = document.createElement('button')
            join_button.setAttribute('id', 'join_button')
            join_button.innerHTML = 'log-in <i class="fas fa-sign-in-alt"></i>'

            var join_input_container = document.createElement('div')
            join_input_container.setAttribute('id', 'join_input_container')

            var join_input = document.createElement('input')
            join_input.setAttribute('id', 'join_input')
            join_input.setAttribute('maxlength', 15)
            join_input.placeholder = 'username'

            join_input.onkeyup = function() {
                if (join_input.value.length > 0) {
                    join_button.classList.add('enabled')
                    join_button.onclick = function() {

                        //check if user is exist
                        var index = users.findIndex((user) => {
                            return user.user === join_input.value
                        });
                        if (index != -1) {
                            parent.save_user(index)
                            join_container.remove()
                            parent.homeUser(users[index].type == "super");
                        } else
                            return;
                    }
                } else {
                    join_button.classList.remove('enabled')
                }
            }

            join_button_container.append(join_button)
            join_input_container.append(join_input)
            join_inner_container.append(join_input_container, join_button_container)
            join_container.append(join_inner_container)
            document.body.append(join_container)
        }
        create_load(id) {
            // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
            var parent = this;
            var container = document.getElementById(id)
            container.innerHTML = ''

            var loader_container = document.createElement('div')
            loader_container.setAttribute('class', 'loader_container')

            var loader = document.createElement('div')
            loader.setAttribute('class', 'loader')

            loader_container.append(loader)
            container.append(loader_container)

        }
        create_chat(id) {
            var parent = this;
            // GET THAT MEMECHAT HEADER OUTTA HERE
            var title_container = document.getElementById('title_container')
            var title = document.getElementById('title')
            title_container.classList.add('chat_title_container')
            title.classList.add('chat_title')

            var chat_container = document.createElement('div')
            chat_container.setAttribute('id', 'chat_container')

            var chat_inner_container = document.createElement('div')
            chat_inner_container.setAttribute('id', 'chat_inner_container')

            var chat_content_container = document.createElement('div')
            chat_content_container.setAttribute('id', 'chat_content_container')

            var chat_input_container = document.createElement('div')
            chat_input_container.setAttribute('id', 'chat_input_container')

            var chat_input_send = document.createElement('button')
            chat_input_send.setAttribute('id', 'chat_input_send')
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`

            var chat_input = document.createElement('input')
            chat_input.setAttribute('id', 'chat_input')
            chat_input.setAttribute('maxlength', 1000)
            chat_input.placeholder = `${localStorage.getItem('user')}. Say something...`

            chat_input.onkeyup = function() {
                if (chat_input.value.length > 0) {
                    chat_input_send.removeAttribute('disabled')
                    chat_input_send.classList.add('enabled')
                    chat_input_send.onclick = function() {
                        chat_input_send.setAttribute('disabled', true)
                        chat_input_send.classList.remove('enabled')
                        if (chat_input.value.length <= 0) {
                            return
                        }
                        parent.create_load('chat_content_container')
                        parent.send_message(chat_input.value, id)
                        chat_input.value = ''
                            // Focus on the input there after
                        chat_input.focus()
                    }
                } else {
                    chat_input_send.classList.remove('enabled')
                }
            }

            var chat_logout_container = document.createElement('div')
            chat_logout_container.setAttribute('id', 'chat_logout_container')

            var chat_logout = document.createElement('button')
            chat_logout.setAttribute('id', 'chat_logout')
            chat_logout.textContent = `${localStorage.getItem('user')} • logout`

            chat_logout.onclick = function() {
                localStorage.clear()
                parent.home()
            }

            chat_logout_container.append(chat_logout)
            chat_input_container.append(chat_input, chat_input_send)
            chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
            chat_container.append(chat_inner_container)
            document.body.append(chat_container)
            parent.create_load('chat_content_container')
            this.refresh_chat(id)
        }
        save_user(index) {
            localStorage.setItem('user', users[index].user)
            localStorage.setItem('id', users[index].id)
        }
        send_message(message, id) {
            var parent = this
            if (parent.get_user() == null && message == null) {
                return
            }
            var messages = db.ref('chats/' + `${id}/messages`);

            messages.once('value', function(snapshot) {
                var index = parseFloat(snapshot.numChildren()) + 1

                db.ref('chats/' + `${id}/messages/` + `message_${index}`).set({
                    name: parent.get_user(),
                    message: message,
                    index: index
                }).then(function() {
                    parent.refresh_chat(id)
                })
            })
        }
        get_user() {
            if (localStorage.getItem('user') != null) {
                return localStorage.getItem('user')
            } else {
                this.homeUser()
            }
        }
        refresh_chat(id) {
            var chat_content_container = document.getElementById('chat_content_container')
            var messages = db.ref('chats/');


            messages.on('value', function(snapshot) {

                var all = Object.keys(snapshot.val());
                var index = all.findIndex((e) => { return e == id });
                var allValues = Object.values(snapshot.val());
                var valuesV = Object.values(allValues[index]);
                var values = Object.values(valuesV[1]);

                chat_content_container.innerHTML = ''


                ////////////////////////////////testt//////
                // if (snapshot.numChildren() == 0) {
                //     return
                // }
                messages
                var guide = []
                var unordered = []
                var ordered = []
                for (var i, i = 0; i < values.length; i++) {
                    guide.push(i + 1)
                    unordered.push([values[i], values[i].index]);
                }

                guide.forEach(function(key) {
                    var found = false
                    unordered = unordered.filter(function(item) {
                        if (!found && item[1] == key) {
                            ordered.push(item[0])
                            found = true
                            return false
                        } else {
                            return true
                        }
                    })
                })

                ordered.forEach(function(data) {
                    var name = data.name
                    var message = data.message

                    var message_container = document.createElement('div')
                    message_container.setAttribute('class', 'message_container')

                    var message_inner_container = document.createElement('div')
                    message_inner_container.setAttribute('class', 'message_inner_container')

                    var message_user_container = document.createElement('div')
                    message_user_container.setAttribute('class', 'message_user_container')

                    var message_user = document.createElement('p')
                    message_user.setAttribute('class', 'message_user')
                    message_user.textContent = `${name}`

                    var message_content_container = document.createElement('div')
                    message_content_container.setAttribute('class', 'message_content_container')

                    var message_content = document.createElement('p')
                    message_content.setAttribute('class', 'message_content')
                    message_content.textContent = `${message}`

                    message_user_container.append(message_user)
                    message_content_container.append(message_content)
                    message_inner_container.append(message_user_container, message_content_container)
                    message_container.append(message_inner_container)

                    chat_content_container.append(message_container)
                });
                // Go to the recent message at the bottom of the container
                chat_content_container.scrollTop = chat_content_container.scrollHeight;
            })
        }
        getAllChat() {
            var parent = this;
            var chat_content_container = document.getElementById('all_content_container')

            var groups = db.ref('chats/');


            groups.on('value', function(snapshot) {
                var messages = db.ref('chats/');
                var all_group = []

                var all = Object.values(snapshot.val());

                console.log(all)
                all.forEach((e) => {
                    if (e.users)
                        if (e.users.findIndex((el) => {
                                return JSON.parse(el) == JSON.parse(localStorage.getItem('id'))
                            }) != -1) {
                            all_group.push(e)
                        }

                    chat_content_container.innerHTML = ''

                    all_group.forEach(function(data) {
                        var id = data.name;
                        var name = data.name;



                        if (data.messages) {
                            var all = data.messages;
                            var last_message = Object.values(all)
                            var sender = last_message[last_message.length - 1].name + ':';
                            last_message = last_message[last_message.length - 1].message;

                            console.log(last_message)
                        } else {
                            sender = ''
                            last_message = "no message"
                        }




                        var all_container = document.createElement('div')
                        all_container.setAttribute('class', 'all_container')

                        var all_inner_container = document.createElement('div')
                        all_inner_container.setAttribute('class', 'all_inner_container')

                        var all_user_container = document.createElement('div')
                        all_user_container.setAttribute('class', 'all_user_container')

                        var all_user = document.createElement('p')
                        all_user.setAttribute('class', 'all_user')
                        all_user.textContent = `${name}`

                        var all_content_container = document.createElement('div')
                        all_content_container.setAttribute('class', 'all_content_container')

                        var all_content = document.createElement('p')
                        all_content.setAttribute('class', 'all_content')
                        all_content.textContent = `${sender} ${last_message}`

                        all_user_container.append(all_user)
                        all_content_container.append(all_content)
                        all_inner_container.append(all_user_container, all_content_container)
                        all_container.append(all_inner_container)

                        chat_content_container.append(all_container);

                        all_container.setAttribute('id', id);


                        all_container.onclick = function() {
                            document.getElementById('all_container').remove()
                            parent.create_chat(this.id);

                        }


                    });



                })

            })



            // Go to the recent message at the bottom of the container
            chat_content_container.scrollTop = chat_content_container.scrollHeight;



        }
        createGroup() {

            //create database
            //chake if Supervisor
            //call addAdmin function
            //call addEmployees function
        }
        homeUser() {
            var parent = this;
            // GET THAT MEMECHAT HEADER OUTTA HERE
            var title_container = document.getElementById('title_container')
            var title = document.getElementById('title')
            title_container.classList.add('all_title_container')
            title.classList.add('all_title')

            var all_container = document.createElement('div')
            all_container.setAttribute('id', 'all_container')

            var all_inner_container = document.createElement('div')
            all_inner_container.setAttribute('id', 'all_inner_container')

            var all_content_container = document.createElement('div')
            all_content_container.setAttribute('id', 'all_content_container')
            var chat_logout_container = document.createElement('div')
            chat_logout_container.setAttribute('id', 'chat_logout_container')

            var chat_logout = document.createElement('button')
            chat_logout.setAttribute('id', 'chat_logout')
            chat_logout.textContent = `${localStorage.getItem('user')} • logout`


            chat_logout.onclick = function() {
                localStorage.clear()
                parent.home()
            }

            chat_logout_container.append(chat_logout)

            all_inner_container.append(all_content_container, chat_logout_container)
            all_container.append(all_inner_container)
            document.body.append(all_container)
            parent.create_load('all_content_container');

            parent.getAllChat();

        }


    }

    app = new MEME_CHAT()
        // if this is a new user then take them to the home screen
    if (localStorage.getItem('user') == null) {
        app.home()
    } else {
        // else. They are a return user.
        app.chat()
    }

}