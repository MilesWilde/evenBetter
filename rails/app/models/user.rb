class User < ApplicationRecord
  has_many: :bets, through: :users_bets
  has_many: :messages
end
