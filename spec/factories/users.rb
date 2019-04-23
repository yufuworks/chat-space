FactoryBot.define do
  factory :user, class: User do
    password = Faker::Internet.password(8)
    name {Faker::Name.first_name}
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end
end