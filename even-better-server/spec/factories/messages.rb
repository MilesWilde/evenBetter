FactoryGirl.define do
  factory :message do
    content { Faker::Lorem.sentence(3, false, 10) }
  end
end
