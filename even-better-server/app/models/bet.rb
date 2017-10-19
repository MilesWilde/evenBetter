class Bet < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :messages
  belongs_to :mediator, class_name: :user
  belongs_to :creator, class_name: :user
end
