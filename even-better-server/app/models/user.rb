class User < ApplicationRecord
<<<<<<< HEAD
  has_many :bets, through: :users_bets
  has_many :messages
=======

  has_secure_password

  has_and_belongs_to_many :bets
  has_many :messages

  validates_presence_of :first_name, :last_name, :email, :username, :password_digest
  validates_uniqueness_of :email, :username
  validates :password, length: { minimum: 8 }
>>>>>>> a2feb1364fa22213646a9b9d074fe92053c8673b
end
