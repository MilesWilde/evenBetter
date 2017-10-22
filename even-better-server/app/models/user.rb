class User < ApplicationRecord

  has_secure_password

  has_and_belongs_to_many :bets
  has_many :messages
  has_many :mediated, foreign_key: 'mediator_id', class_name: 'Bet'
  has_many :owned, foreign_key: 'creator_id', class_name: 'Bet'

  validates_presence_of :first_name, :last_name, :email, :username, :password_digest
  validates_uniqueness_of :email, :username
  validates :password, length: { minimum: 8 }

end
