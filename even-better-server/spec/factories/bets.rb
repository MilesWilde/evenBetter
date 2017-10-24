FactoryGirl.define do
  factory :bet do
    deadline = Faker::Time.forward(5)
    title { Faker::Seinfeld.quote }
    betting_deadline { Faker::Time.between(Date.today, deadline) }
    outcome_deadline { deadline }
    description { Faker::Lorem.paragraph }
    possibilities { create_list(:possibility, 2) }

    trait :expired do
      deadline = Faker::Time.backward(5)
      betting_deadline { deadline }
      outcome_deadline { Faker::Time.between(deadline, Date.today) }
    end
  end
end
