class BetUser < ApplicationRecord
  self.table_name = 'bets_users'
  belongs_to :possibility
  belongs_to :user
  belongs_to :bet
end
