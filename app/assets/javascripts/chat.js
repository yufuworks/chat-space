$(document).on("turbolinks:load", function() {
  if ($(".messages").length) {
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
  }
  window.nowGroupId = $(".current-group").data("id");
});

$(function(){

  function scrollUnder(){
    if ($(".messages").length) {
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
    }
  }

  function buildHTML(data){
    let html = `<div class="message" data-id=${data.id}>
                  <div class="upper-info">
                    <p class="upper-info__user">${data.name}</p>
                    <p class="upper-info__date">${data.created_at}</p>
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
    let lastMessageId = $('.message:last').data('id');
    if (lastMessageId != null) {
      $.ajax({
        url: `/groups/${nowGroupId}/api/chats`,
        type: 'get',
        dataType: 'json',
        data: {
          id: lastMessageId,
          group_id: nowGroupId
        }
      })
      .done(function(chats) {
        chats.forEach(function(chat){
          if (chat.group_id == nowGroupId) {
            let html = buildHTML(chat);
            $('.messages').append(html);
          }
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
