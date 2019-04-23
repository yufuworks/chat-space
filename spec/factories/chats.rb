FactoryBot.define do
  factory :chat, class: Chat do
    message {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/no_image.jpg")}
    # image { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/logo_image.jpg'), 'image/jpeg') }

    user
    group
  end
end