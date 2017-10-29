class Bet < ApplicationRecord
  include Randomable

  belongs_to :creator, class_name: 'User'
  has_and_belongs_to_many :users
  has_many :bet_users
  has_many :messages
  has_many :possibilities
  belongs_to :mediator, class_name: 'User'
  belongs_to :outcome, class_name: 'Possibility'

  validates_presence_of :title, :creator
  validate :must_have_at_least_2_possibilities

  private

  def must_have_at_least_2_users
    unless self.users.length >= 2
      errors.add(:users, "must have at least 2 users")
    end
  end

  def must_have_at_least_2_possibilities
    unless self.possibilities.length >=2
      errors.add(:possibilities, "must have at least 2 possibilities")
    end
  end
end
