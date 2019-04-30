class Api::ChatsController < ApplicationController
  def index
    latest_chats = Chat.where('id >= ?', params[:id]})
    if latest_chats.present?
  end
end
