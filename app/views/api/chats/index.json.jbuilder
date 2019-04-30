json.array! @chats do |chat|
  json.content chat.content
  json.image chat.image
  json.created_at format_posted_time(chat.created_at)
  json.user_name chat.user.name
  json.id chat.id
end
