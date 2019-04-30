
  json.message @chat.message
  json.image @chat.image
  json.created_at @chat.created_at.strftime("%Y/%m/%d %H:%M")
  json.name @chat.user.name
  json.id @chat.id
