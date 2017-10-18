class Bet < ApplicationRecord
  has_many: :users, through: :users_bets
  has_many: :messages
  belongs_to: :user, as: :mediator
  belongs_to: :user, as: :creator
end
