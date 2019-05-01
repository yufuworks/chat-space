class Api::ChatsController < ApplicationController
  def index
    @chats = Chat.where("id > #{params[:id]}")
    render 'index', formats: 'json', handlers: 'jbuilder'
  end
end
