FactoryGirl.define do
  factory :message, class: 'Messages' do
    content { Faker::Lorem.sentence(3, false, 10) }
  end
end
