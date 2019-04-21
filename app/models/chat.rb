class Chat < ApplicationRecord
  mount_uploader :image, ImagesUploader

  belongs_to :group
  belongs_to :user

  validates :message, presence: true, unless: :image?
end
