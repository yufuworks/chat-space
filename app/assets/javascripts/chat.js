$(function(){
function buildHTML(data){
  var html = `<div class="message">
                <div class="upper-info">
                  <p class="upper-info__user">${data.name}</p>
                  <p class="upper-info__date">${data.created_at}</p>
                </div>
                <p class="message__text">${data.message}</p>`
  if (data.image.url == null){
    html = $(html).append(
              `</div>`
  )} else {
    html = $(html).append(
                `<img src = '${data.image.url}'>
              </div>`
  )}
  return html;
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
    var formData = new FormData($(this).get(0));
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
      var html = buildHTML(data);
      $('.messages').append(html)
      $('#textboxmessage_content').val('')
      $('.new-message__submit-btn').removeAttr("disabled");
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
})
