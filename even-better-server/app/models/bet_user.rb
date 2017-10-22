class BetUser < ApplicationRecord
  belongs_to :possibility
  belongs_to :user
end
