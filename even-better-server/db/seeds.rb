# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '--- CREATING USERS ---'
30.times do
  FactoryGirl.create(:user)
end

puts '--- CREATING BETS WITH 2 POSSIBILITIES AND 2 USERS EACH ---'
30.times do
  bet = FactoryGirl.create(:bet, { creator: User.random, mediator: User.random })
  2.times do
    FactoryGirl.create(:possibility, { bet: bet })
  end
  2.times do
    bet_user = nil
    loop do
      bet_user = BetUser.new(user: User.random, bet: Bet.random, possibility: Possibility.random)
      break if(!BetUser.exists?(user_id: bet_user.user_id, bet_id: bet_user.bet_id))
    end
    bet_user.save!
  end
end

puts '--- ADDING ADDITIONAL USERS TO RANDOM BETS ---'
20.times do
  bet_user = nil
  loop do
    bet_user = BetUser.new(user: User.random, bet: Bet.random, possibility: Possibility.random)
    break if(!BetUser.exists?(user_id: bet_user.user_id, bet_id: bet_user.bet_id))
  end
  bet_user.save!
end

puts '--- CREATING ADDITIONAL POSSIBILITIES FOR RANDOM BETS ---'
20.times do
  FactoryGirl.create(:possibility, { bet: Bet.random })
end

puts '--- CREATING MESSAGES ---'
100.times do
  FactoryGirl.create(:message, { user: User.random, bet: Bet.random })
end
