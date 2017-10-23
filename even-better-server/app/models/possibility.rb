class Possibility < ApplicationRecord
  include Randomable

  belongs_to :bet
  has_many :bet_users
  has_many :users, through: :bet_users
end
