// $(document).on("turbolinks:load", function() {
//     const t = function(t) {
//         const e = t.image ? `<img src="${t.image}">` : "";
//         return `<div class="message" data-message_id="${t.id}">\n
//                 <div class="upper-info">\n
//                 <p class="upper-info__user">${t.user_name}</p>\n
//                 <p class="upper-info__date">${t.created_at}</p>\n
//                 </div>\n
//                 <p class="message__text">${t.content}</p>\n
//                 ${e}\n
//                 </div>`
//     }
//       , e = ()=>{
//         const e = $(".message:last").data("message_id") || 0;
//         $.ajax({
//             url: `/groups/${r}/api/messages`,
//             data: {
//                 latest_id: e,
//                 group_id: r
//             },
//             dataType: "json"
//         }).done(function(e) {
//             0 != e.length && ($.each(e, function(e, n) {
//                 $(".messages").append(t(n))
//             }),
//             $(".messages").animate({
//                 scrollTop: $(".messages")[0].scrollHeight
//             }, 200))
//         }).fail(function() {
//             alert("自動更新に失敗しました")
//         })
//     }
//     ;
//     let n;
//     const r = $(".current-group").data("group_id");
//     document.addEventListener("turbolinks:visit", function() {
//         clearInterval(n)
//     }),
//     $("#new_message").on("submit", function(e) {
//         e.preventDefault();
//         const n = new FormData(this);
//         $.ajax({
//             url: $(this).attr("action"),
//             type: "POST",
//             data: n,
//             dataType: "json",
//             processData: !1,
//             contentType: !1
//         }).done(function(e) {
//             "" == e.content && null == e.image ? alert("メッセージを入力して下さい") : ($("#new_message")[0].reset(),
//             $(".messages").append(t(e)),
//             $(".messages").animate({
//                 scrollTop: $(".messages")[0].scrollHeight
//             }, 200))
//         }).fail(function() {
//             alert("通信に失敗しました")
//         }).always(function() {
//             $(".new-message__submit-btn").prop("disabled", !1)
//         })
//     }),
//     location.pathname == `/groups/${r}/messages` && (n = setInterval(e, 5e3))
// }),
// $(document).on("turbolinks:load", function() {
//     function t(t) {
//         const e = `<div class="chat-group-user clearfix">\n
//                     <p class="chat-group-user__name">${t.name}</p>\n
//                     <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${t.id}" data-user-name="${t.name}">追加</a>\n
//                     </div>`;
//         i.append(e)
//     }
//     function e(t) {
//         const e = `<div class="chat-group-user clearfix">\n
//                     <p class="chat-group-user__name">${t}</p>\n
//                     </div>`;
//         i.append(e)
//     }
//     function n(t, e) {
//         const n = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${e}'>\n
//                     <input name='group[user_ids][]' type='hidden' value='${e}'>\n
//                     <p class='chat-group-user__name'>${t}</p>\n
//                     <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>\n
//                     </div>`;
//         $(".js-add-user").append(n)
//     }
//     let r = [];
//     const i = $("#user-search-result");
//     $(".js-chat-member").each(function(t, e) {
//         r.push(e.getAttribute("id"))
//     }),
//     $("#user-search-field").on("input", function(n) {
//         n.preventDefault();
//         const o = $("#user-search-field").val();
//         0 != o.length ? $.ajax({
//             type: "GET",
//             url: "/users",
//             dataType: "json",
//             data: {
//                 keyword: o,
//                 user_ids: r
//             }
//         }).done(function(n) {
//             i.empty(),
//             0 !== n.length ? n.forEach(function(e) {
//                 t(e)
//             }) : e("一致するユーザーが見つかりません")
//         }).fail(function() {
//             alert("ユーザー検索に失敗しました")
//         }) : i.empty()
//     }),
//     i.on("click", ".chat-group-user__btn--add", function() {
//         const t = $(this).attr("data-user-name")
//           , e = $(this).attr("data-user-id");
//         r.push(e),
//         $(this).parent().remove(),
//         n(t, e)
//     }),
//     $(".js-add-user").on("click", ".js-remove-btn", function() {
//         const t = $(this).siblings("input").val();
//         r = r.filter(e=>e != t),
//         $(this).parent().remove()
//     })
// });
