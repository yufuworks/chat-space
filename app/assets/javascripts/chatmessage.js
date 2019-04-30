$(document).on("turbolinks:load", function(){
  $(function(){
    setInterval(update, 10000);
  });

  function update(){
    let messageId = $('.message:last').data('message_id');
    $.ajax({
      url: `/groups/${groupId}/chats`,
      type: 'GET',
      data: {
        message: { 
          id: messageId,
          
        }
      },
      dataType: 'json'
    })
  }
});
