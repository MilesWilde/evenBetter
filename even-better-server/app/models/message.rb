class Message < ApplicationRecord
  belongs_to :user
  belongs_to :bet

  validates_presence_of :user, :bet
end
