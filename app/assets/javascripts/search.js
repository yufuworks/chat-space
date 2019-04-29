$(document).on("turbolinks:load", function() {
function makeLists(users){
  let userIds = $('.user_ids').val();
  let c = $("#chat-group-users").find('.chat-group-user__id');
  users.forEach(function(user){
    if (userIds.includes(user.id)) {
      ;
    } else {
      appendUserAdd(user);
    }
  })
}

function appendUserAdd(user) {
  let html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn'>追加</div>
                </div>`
  $("#user-search-result").append(html);
}

function appendUserRemove(user) {
  let html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.id}'>
  <input name='group[user_ids][]' type='hidden' value='${user.id}' class="chat-group-user__id">
  <p class='chat-group-user__name'>${user.name}</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  $("#chat-group-users").append(html);
}

function noResult(){
  let html = `<div class='chat-group-user clearfix js-chat-member>
                <p class='chat-group-user__name'>一致するユーザーはいません</p>
              </div>`
  $("#user-search-result").append(html);
}

function deleteSearchResult(){
  $("#user-search-result").empty();
}

  $("#user-search-field").on('keyup', function(e){
    e.preventDefault();
    const input = $.trim($("#user-search-field").val());
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { 
        keyword: input,
      },
      dataType: 'json'
    })
    .done(function(users) {
      if (input.length !== 0) {
        deleteSearchResult();
        makeLists(users);
      } else {
        deleteSearchResult();
        noResult();
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).click(function(e){
    const target = $(e.target);
    if (target.closest(".js-add-btn").length) {
      let id = target.parent(".chat-group-user").attr("id").slice(16);
      let name = target.siblings(".chat-group-user__name").text();
      let user = {id: id, name: name};
      target.parent(".js-chat-member").remove();
      appendUserRemove(user);
    } else if (target.closest(".js-remove-btn").length) {
      target.parent(".js-chat-member").remove();
    } else {
      ;
    }
  })
})
