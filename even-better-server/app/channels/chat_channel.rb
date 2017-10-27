class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:room]}"
  end

  def unsubscribed; end

  def create(data)
    Message.create!(
      content: data.fetch('content'),
      user: User.first,
      bet: Bet.find(params[:room])
    )
  end
end
