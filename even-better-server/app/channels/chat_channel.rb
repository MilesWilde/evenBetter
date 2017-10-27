class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed; end

  def create(data)
    Message.create!(
      content: data.fetch('content'),
      user: current_user,
      bet: Bet.find(params[:room])
    )
  end
end
