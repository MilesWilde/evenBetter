class Bet < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :messages
  belongs_to :mediator, class_name: :user
  belongs_to :creator, class_name: :user

  validates :title, presence: true
  validates :betting_deadline, presence: true
  validates :outcome_deadline, presence: true
  validates :mediator, presence: true
  validates :creator, presence: true
end
