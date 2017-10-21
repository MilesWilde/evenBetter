class Bet < ApplicationRecord
  belongs_to :creator, class_name: :user
  has_and_belongs_to_many :users
  has_many :messages
  has_one :mediator, class_name: :user

  validates_presence_of :title, :betting_deadline, :outcome_deadline, :creator
end
