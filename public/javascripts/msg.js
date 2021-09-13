var socket;

// client-side
if (window.location.pathname === '/msg') {
  socket = io('http://localhost:3000');


  socket.on('user_connect', async (user) => {
    // update view
    online_user_container[0].innerHTML += USER_ELEMENT(user);
  });

  $('.msg-send-botton').click(() => {
    const MSG = $('.msg-input').val();
    const TO_USER = middleHeader[1].id;

    middleMain.innerHTML += RECIVED_MSG(MSG_LOADER);

    socket.emit('SENT_MSG', TO_USER, MSG, (success) => {
      if (success) {
        middleMain.lastChild.innerHTML = MSG;
      } else {
        middleMain.lastChild.remove();
        middleMain.innerHTML += INFO('message could not be sent try again!!!');
      }
    });
  });



  socket.on('DELIVER_MSG', (MSG) => {
    middleMain.innerHTML += SENT_MSG(MSG);
  });


  socket.on('user_disconnect', (user_id) => {
    // update views
    $(`#${user_id}`).parent().remove();
  });
}
