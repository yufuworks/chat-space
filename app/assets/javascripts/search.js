$(function(){
var search_list = $("#user-search-result");
function appendUser(user){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>追加</div>
              </div>`
  search_list.append(html);
  console.log(html);
}
function appendErrMsgToHTML(msg) {
  var html = `<li>
                <div class='chat-group-user clearfix'>${ msg }</div>
              </li>`
  search_list.append(html);
}
  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        console.log(users);
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })
})