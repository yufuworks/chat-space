$(function(){
var search_list = $("#chat-group-users");
function appendUser(user){
  var html = `<div id="chat-group-user-${user.id}" class="chat-group-user clearfix">
              <input name="chat_group[${user.id}][]", type="hidden", value="${user.id}">/
              <p class="chat-group-user__name">${user.name}</p>
              </input>
              </div>`
  search_list.append(html);
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
      $("#chat-group-users").empty();
      if (users.length !== 0) {
        console.log(users)
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
