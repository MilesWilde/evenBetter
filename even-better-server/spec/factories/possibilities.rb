FactoryGirl.define do
  factory :possibility do
    description { Faker::Commerce.product_name }
  end
end
