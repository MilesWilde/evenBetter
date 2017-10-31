require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.cron '* 0 * * *' do
  User.find_each do |user|
    user.points += 100
    user.save!(validate: false)
  end
end