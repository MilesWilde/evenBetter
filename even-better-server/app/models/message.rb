class Message < ApplicationRecord
  # after_create_commit do
  #   MessageCreationEventBroadcastJob.perform_later(self)
  # end
  belongs_to :user
  belongs_to :bet

  validates_presence_of :user, :bet
end
