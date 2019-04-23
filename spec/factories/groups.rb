FactoryBot.define do
  factory :group, class: Group do
    name {Faker::TvShows::SiliconValley.company}
  end
end