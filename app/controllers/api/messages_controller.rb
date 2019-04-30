class Api::MessagesController < ApplicationController
  def index
    latest_message = Chat.where('id >= ?', params[:id]})
    if latest_message.present?
  end
end
