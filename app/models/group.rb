class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :chats
  validates :name, presence: true
  # validates :name, :user_ids, presence: true
  accepts_nested_attributes_for :group_users, allow_destroy: true
  # accepts_nested_attributes_for :users, allow_destroy: true

  def show_last_message
    if (last_message = chats.last).present?
      last_message.message? ? last_message.message : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
