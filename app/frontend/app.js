(function () {
    $(document).ready(function () {

        /* Poor man state machine */
        var currentState = 'app-login';

        function changeState(newState) {
            var hiddenStateClass = 'hidden';
            $('#' + currentState).addClass(hiddenStateClass);
            currentState = newState;
            $('#' + newState).removeClass(hiddenStateClass);
        }

        /* end poor man state machine */
        var currentUser = '';

        function displayChatMessage(msg) {
            var html = $('<li><span class="user">' + msg.fromUser + '</span> <span class="message">' + msg.message + '</span></li>');
            if (msg.fromUser === currentUser) {
                html.addClass('text-right');
            }
            $('#app-chatroom .chat ul').append(html);
        }

        var usersTypingTimeoutRefs = {};

        function displayUserTyping(user) {
            var html = $('<li><span class="user">' + msg.fromUser + '</span> <span class="message">' + msg.message + '</span></li>');
            html.addClass(user + '-typing');
            $('#app-chatroom .chat ul').append(html);

            usersTypingTimeoutRefs[user] = setTimeout(function () {
                html.remove();
            }, 1000);
        }

        $('#chat-submit').click(function () {
            socket.emit('chat-message', {fromUser: currentUser, message: $('#chat-message').val(), toUser: null});
        });

        var socket = io('http://localhost:3001');
        socket.on('connect', function () {
        });

        socket.on('chat-message', function (data) {
            displayChatMessage(data);
        });

        socket.on('disconnect', function () {
            console.log("Connection lost");
        });

        socket.on('chat-typing', function (data) {
            displayUserTyping(data.user);
        });

        $('#chat-login-btn').click(function () {
            currentUser = $('#chat-current-user').val();
            changeState("app-chatroom");
            $('.user-placeholder').text(currentUser);
        });

        $('#chat-message').change(function () {
            socket.emit('chat-typing', {user: currentUser});
        });

    });
})()
