FactoryGirl.define do
  password = SecureRandom.base64
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    username Faker::Internet.user_name
    email Faker::Internet.email
    password password
    password_confirmation password
    points 1000
  end
end
