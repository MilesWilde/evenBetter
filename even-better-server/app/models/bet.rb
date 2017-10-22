class Bet < ApplicationRecord
  include Randomable

  belongs_to :creator, class_name: 'User'
  has_and_belongs_to_many :users
  has_many :messages
  has_many :possibilities
  has_one :mediator, class_name: 'User'

  validates_presence_of :title, :betting_deadline, :outcome_deadline, :creator
end
