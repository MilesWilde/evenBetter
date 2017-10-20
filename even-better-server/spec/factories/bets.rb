FactoryGirl.define do
  factory :bet do
    deadline = Faker::Time.forward(5)
    title Faker::Seinfeld.quote
    betting_deadline Faker::Time.between(Date.today, deadline)
    outcome_deadline deadline
    description Faker::Lorem.paragraph
  end
end
