class Possibility < ApplicationRecord
  belongs_to :bet
  has_many :users, through: 'BetUser'
end
