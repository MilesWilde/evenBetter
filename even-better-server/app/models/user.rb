class User < ApplicationRecord

  has_secure_password

  has_and_belongs_to_many :bets
  has_many :messages

  validates_presence_of :first_name, :last_name, :email, :username, :password_digest
  validates :password, length: { minimum: 8 }
end
