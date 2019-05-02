$(function(){
  const groupId = $(".current-group").data("id");

  scrollUnder();

  function scrollUnder(){
    if ($(".messages").length) {
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
    }
  }

  function buildHTML(data){
    let gmtJp = data.created_at.toLocaleString();
    let html = `<div class="message" data-id=${data.id}>
                  <div class="upper-info">
                    <p class="upper-info__user">${data.name}</p>
                    <p class="upper-info__date">${gmtJp}</p>
                  </div>
                  <p class="message__text">${data.message}</p>`
    data.image.url == null 
    ? html = $(html).append(
                `</div>`
    ) : html = $(html).append(
                  `<img src = '${data.image.url}'>
                </div>`
    )
    return html;
  }

  function reloadMessages() {
    let last_message_id = $('.message:last').data('id');
    if (last_message_id != null) {
      $.ajax({
        url: `/groups/${groupId}/api/chats`,
        type: 'get',
        dataType: 'json',
        data: {
          id: last_message_id,
          group_id: groupId
        }
      })
      .done(function(chats) {
        chats.forEach(function(chat){
          let html = buildHTML(chat);
          $('.messages').append(html);
        })
        if (chats.length !== 0) scrollUnder();
      })
      .fail(function() {
      });
    } 
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData($(this).get(0));
    $.ajax({
      url: window.location.href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
      disabled: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.new-message__submit-btn').removeAttr("disabled");
      scrollUnder();
    })
    .fail(function(){
      alert('通信に失敗しました');
      $('.new-message__submit-btn').removeAttr("disabled");
    })
  })
  if ($(".messages").length) {
    setInterval(reloadMessages, 5000);
  }
});
