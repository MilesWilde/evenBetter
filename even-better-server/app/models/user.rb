class User < ApplicationRecord
  has_and_belongs_to_many :bets
  has_many :messages

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :username, presence: true
  validates :password_hash, presence: true, length: { minimum: 8 }
end
