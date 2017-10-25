class ChatChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    message = Message.find(params[:id])
    stream_for message
  end
end