# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    binding.pry
    #message = Message.find(params[:id])
    #stream_for message
    response = { message: "Subcribed" }
    json_response(response, :created)
  end

  def receive(data)
    binding.pry
    ActionCable.server.broadcast("chat_#{params[:room]}", data)
  end
end