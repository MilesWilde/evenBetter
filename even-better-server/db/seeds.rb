# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '---CREATING USERS AND BETS THAT THEY OWN---'
5.times do
  user = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: '12345678',
    password_confirmation: '12345678',
    points: 1000
  )

  deadline = Faker::Time.forward(5)
  bet = user.bets.create!(
    title: Faker::Seinfeld.quote,
    betting_deadline: Faker::Time.between(Date.today, deadline),
    outcome_deadline: deadline,
    description: Faker::Lorem.paragraph,
    creator: user
  )
  2.times do
    bet.possibilities.create(description: Faker::Commerce.product_name)
  end

  user = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: '12345678',
    password_confirmation: '12345678',
    points: 0
  )

  deadline = Faker::Time.backward(5)
  bet = user.bets.create!(
    title: Faker::Seinfeld.quote,
    betting_deadline: deadline,
    outcome_deadline: Faker::Time.between(deadline, Date.today),
    description: Faker::Lorem.paragraph,
    creator: user
    )
    2.times do
      bet.possibilities.create(description: Faker::Commerce.product_name)
    end
end

puts '---CREATING USERS AND ADDING THEM TO EXISTING BETS---'
20.times do
  user = User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: '12345678',
    password_confirmation: '12345678',
    points: 1000
  )

  user.bets << Bet.random

end
