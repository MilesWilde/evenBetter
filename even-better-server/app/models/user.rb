class User < ApplicationRecord
  include Randomable

  has_secure_password

  has_and_belongs_to_many :bets
  has_many :messages
  has_many :mediated_bets, foreign_key: 'mediator_id', class_name: 'Bet'
  has_many :created_bets, foreign_key: 'creator_id', class_name: 'Bet'
  has_many :bet_users
  has_many :invites, -> { where has_accepted: nil }, class_name: 'BetUser'
  has_many :bet_invites, through: :invites, class_name: 'Bet', source: :bet
  has_many :possibilities, through: :bet_users

  validates_presence_of :first_name, :last_name, :email, :username, :password_digest
  validates_uniqueness_of :email, :username
  validates :password, length: { minimum: 8 }

end
