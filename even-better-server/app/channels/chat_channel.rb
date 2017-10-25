class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(data)
    Message.create!(
      content: data.fetch('content'),
      user: User.first,
      bet: Bet.last
    )
    # ActionCable.server.broadcast("chat_#{params[:room]}", data)
  end
end
