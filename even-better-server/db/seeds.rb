# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts '--- CREATING "THE CONTEST"'

jerry = User.create!({
  first_name: 'Jerry',
  last_name: 'Seinfeld',
  email: 'jerry@seinfeld.com',
  username: 'varnsen',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

elaine = User.create!({
  first_name: 'Elaine',
  last_name: 'Benes',
  email: 'elaine@seinfeld.com',
  username: 'Suzy',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

george = User.create!({
  first_name: 'George',
  last_name: 'Costanza',
  email: 'george@seinfeld.com',
  username: 'art_vandelay',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

kramer = User.create!({
  first_name: 'Cosmo',
  last_name: 'Kramer',
  email: 'kramer@seinfeld.com',
  username: 'pennypacker',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

newman = User.create!({
  first_name: '-',
  last_name: 'Newman',
  email: 'newman@seinfeld.com',
  username: 'newman',
  points: 1000,
  password: '11111111',
  password_confirmation: '11111111'
})

the_contest = Bet.new({
  title: 'The Contest',
  description: 'Who can go without doing "it" the longest?',
  pool: 400,
  betting_deadline: Time.now + 1.day,
  outcome_deadline: Time.now + 2.day,
  creator: jerry,
  mediator: newman
})

the_contest.users << [jerry, elaine, george, kramer, newman]

pos_jerry = the_contest.possibilities.build({
  description: 'Jerry'
})

pos_elaine = the_contest.possibilities.build({
  description: 'Elaine'
})

pos_george = the_contest.possibilities.build({
  description: 'George'
})

pos_kramer = the_contest.possibilities.build({
  description: 'Kramer'
})

the_contest.save!

link_jerry = jerry.bet_users.first
link_jerry.possibility = pos_jerry
link_jerry.has_accepted = true
link_jerry.save!

link_elaine = elaine.bet_users.first
link_elaine.possibility = pos_elaine
link_elaine.has_accepted = true
link_elaine.save!

link_george = george.bet_users.first
link_george.possibility = pos_george
link_george.has_accepted = true
link_george.save!

link_kramer = kramer.bet_users.first
link_kramer.possibility = pos_kramer
link_kramer.has_accepted = true
link_kramer.save!

link_newman = newman.bet_users.first
link_newman.has_accepted = true
link_newman.save!

puts '--- CREATING "THE ONE WITH THE EMBRYOS" CONTEST'

ross = User.create!({
  first_name: 'Ross',
  last_name: 'Geller',
  email: 'ross@friends.com',
  username: 'ross_g',
  points: 1000,
  password: '11111111',
  password_confirmation: '11111111'
})

chandler = User.create!({
  first_name: 'Chandler',
  last_name: 'Bing',
  email: 'chandler@friends.com',
  username: 'chandler',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

rachel = User.create!({
  first_name: 'Rachel',
  last_name: 'Green',
  email: 'rachel@friends.com',
  username: 'rach',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

monica = User.create!({
  first_name: 'Monica',
  last_name: 'Geller',
  email: 'monica@friends.com',
  username: 'm.geller',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

joey = User.create!({
  first_name: 'Joey',
  last_name: 'Tribbiani',
  email: 'joey@friends.com',
  username: 'J.T.',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

the_quiz = Bet.new({
  title: 'Contest for the apartment',
  description: 'Who knows who better? If the girls win, the boys have to get rid of the animals. If the girls win, the beys get the apartment!',
  pool: 400,
  betting_deadline: Time.now + 1.day,
  outcome_deadline: Time.now + 2.day,
  creator: ross,
  mediator: ross
})

the_quiz.users << [ross, chandler, rachel, monica, joey]

the_girls = the_quiz.possibilities.build({
  description: 'The Girls'
})

the_boys = the_quiz.possibilities.build({
  description: 'The Boys'
})

the_quiz.save!

link_ross = ross.bet_users.first
link_ross.has_accepted = true
link_ross.save!

link_chandler = chandler.bet_users.first
link_chandler.possibility = the_boys
link_chandler.has_accepted = true
link_chandler.save!

link_rachel = rachel.bet_users.first
link_rachel.possibility = the_girls
link_rachel.has_accepted = true
link_rachel.save!

link_monica = monica.bet_users.first
link_monica.possibility = the_girls
link_monica.has_accepted = true
link_monica.save!

link_joey = joey.bet_users.first
link_joey.possibility = the_boys
link_joey.has_accepted = true
link_joey.save!

audi = User.create!({
  first_name: 'Audi',
  last_name: 'Sada',
  email: 'audisho.sada@gmail.com',
  username: 'OD',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

rahul = User.create!({
  first_name: 'Rahul',
  last_name: 'Ramesh',
  email: 'rahul.ramesh888@gmail.com',
  username: 'rahul',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

arsalan = User.create!({
  first_name: 'Arsalan',
  last_name: 'Menhaj',
  email: 'arsalan.menhaj@gmail.com',
  username: 'arsalan',
  points: 900,
  password: '11111111',
  password_confirmation: '11111111'
})

puts '--- CREATING NBA BET FOR TOMORROW ---'

tomorrow = Date.today + 1.day
tomorrow = tomorrow.to_s[0, 10].gsub! '-',''
games = JSON(SportsHelper::stat_scraper('NBA', tomorrow))['games']

games.each do |game|

  nba_bet = Bet.new({
    title: "#{game['homeTeamName']} #{game['homeNickName']} vs. #{game['awayTeamName']} #{game['awayNickName']}",
    pool: 200,
    betting_deadline: Time.now + 1.day,
    outcome_deadline: Time.now + 2.day,
    creator: audi,
    game_date: game['gameDate'],
    game_type: game['gameType'],
    game_code: game['gameCode']
  })

  nba_bet.users << [audi, rahul]

  home_team = nba_bet.possibilities.build({
    description: game['homeTeamName']
  })

  away_team = nba_bet.possibilities.build({
    description: game['awayTeamName']
  })

  nba_bet.save!

  link_audi = audi.bet_users.where({ bet_id: nba_bet.id }).first
  link_audi.possibility = home_team
  link_audi.save!

  link_rahul = rahul.bet_users.where({ bet_id: nba_bet.id }).first
  link_rahul.possibility = away_team
  link_rahul.save!

end


puts '--- CREATING EPL BET FROM YESTERDAY ---'

yesterday = Date.today - 1.day
yesterday = yesterday.to_s[0, 10].gsub! '-',''
games = JSON(SportsHelper::stat_scraper('NHL', yesterday))['games']

games.each do |game|

  nhl_bet = Bet.new({
    title: "#{game['homeTeamName']} #{game['homeNickName']} vs. #{game['awayTeamName']} #{game['awayNickName']}",
    pool: 200,
    betting_deadline: Time.now - 2.day,
    outcome_deadline: Time.now - 1.day,
    creator: audi,
    game_date: game['gameDate'],
    game_type: game['gameType'],
    game_code: game['gameCode']
  })

  nhl_bet.users << [audi, arsalan]

  home_team = nhl_bet.possibilities.build({
    description: game['homeTeamName']
  })

  away_team = nhl_bet.possibilities.build({
    description: game['awayTeamName']
  })

  tie_game = nhl_bet.possibilities.build({
    description: 'Tie'
  })

  if game['homeScore'].to_i > game['awayScore'].to_i
    game_winner = home_team
  elsif game['homeScore'].to_i < game['awayScore'].to_i
    game_winner = away_team
  else
    game_winner = tie_game
  end

  nhl_bet.outcome = game_winner

  nhl_bet.save!

  link_audi = audi.bet_users.where({ bet_id: nhl_bet.id }).first
  link_audi.possibility = home_team
  link_audi.save!

  link_arsalan = arsalan.bet_users.where({ bet_id: nhl_bet.id }).first
  link_arsalan.possibility = away_team
  link_arsalan.save!

end

# puts '--- CREATING USERS ---'
# 30.times do
#   FactoryGirl.create(:user)
# end

# puts '--- CREATING BETS WITH 2 POSSIBILITIES AND 2 USERS EACH ---'
# 30.times do
#   bet = FactoryGirl.create(:bet, { creator: User.random })
#   2.times do
#     FactoryGirl.create(:possibility, { bet: bet })
#   end
#   2.times do
#     bet_user = nil
#     loop do
#       bet_user = BetUser.new(user: User.random, bet: Bet.random, possibility: Possibility.random)
#       break if(!BetUser.exists?(user_id: bet_user.user_id, bet_id: bet_user.bet_id))
#     end
#     bet_user.save!
#   end
# end

# puts '--- ADDING ADDITIONAL USERS TO RANDOM BETS ---'
# 20.times do
#   bet_user = nil
#   loop do
#     bet_user = BetUser.new(user: User.random, bet: Bet.random, possibility: Possibility.random)
#     break if(!BetUser.exists?(user_id: bet_user.user_id, bet_id: bet_user.bet_id))
#   end
#   bet_user.save!
# end

# puts '--- CREATING ADDITIONAL POSSIBILITIES FOR RANDOM BETS ---'
# 20.times do
#   FactoryGirl.create(:possibility, { bet: Bet.random })
# end

# puts '--- SETTING A MEDIATOR FOR RANDOM BETS ---'
# 10.times do
#   bet = Bet.random
#   bet.mediator = bet.users.random
#   bet.save!
# end

# puts '--- CREATING THE POOLS ---'
# bets = Bet.all
# bets.each do |bet|
#   bet.pool = bet.users.count * 100
#   bet.save!
# end

# puts '--- CREATING MESSAGES ---'
# 100.times do
#   FactoryGirl.create(:message, { user: User.random, bet: Bet.random })
# end
