$(function(){
function appendUserAdd(user){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                <input name='group[${user.id}][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn'>追加</div>
              </div>`
  $("#user-search-result").append(html);
}
function appendUserRemove(user){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                <input name='group[${user.id}][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>追加</div>
              </div>`
  $("#user-search-result").append(html);
}
// function appendErrMsgToHTML(msg) {
//   var html = `<div>
//                 <div class='chat-group-user clearfix'>${ msg }</div>
//               </div>`
//   search_list.append(html);
// }
  $("#user-search-field").on('keyup', function(e){
    e.preventDefault();
    var input = $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      if (input == "") {
        $("#user-search-result").empty();
      } else {
        users.forEach(function(user){
          appendUserAdd(user);
        })
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
})