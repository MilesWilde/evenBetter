FactoryGirl.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    username { Faker::Internet.user_name }
    email { Faker::Internet.email }
    password '12345678'
    password_confirmation '12345678'
    points 1000

    trait :no_points do
      points 0
    end
  end
end
