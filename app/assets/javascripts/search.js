$(function(){
function appendUserAdd(user){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                <input name='group[user_id][${user.id}]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn'>追加</div>
              </div>`
  $("#user-search-result").append(html);
}

function appendUserRemove(user){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                <input name='group[group_users_attributes][${user.id}][user_id]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  $("#chat-group-users").append(html);
}

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
      $("#user-search-result").empty();
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

  $(document).click(function(e){
    var target = $(e.target);
    if (target.closest(".js-add-btn").length) {
      var id = target.parent(".chat-group-user").attr("id").slice(16);
      var name = target.siblings(".chat-group-user__name").text();
      var user = {id: id, name: name};
      target.parent(".js-chat-member").remove();
      appendUserRemove(user);
    } else if (target.closest(".js-remove-btn").length) {
      var id = target.parent(".chat-group-user").attr("id").slice(16);
      var name = target.siblings(".chat-group-user__name").text();
      var user = {id: id, name: name};
      target.parent(".js-chat-member").remove();
      appendUserAdd(user);
    } else {
      ;
    }
  })
})
