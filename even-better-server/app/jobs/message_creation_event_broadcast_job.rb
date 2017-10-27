class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_message)
    ActionCable
    .server
    .broadcast(
      'chat_channel',
      id: chat_message.id,
      created_at: chat_message.created_at,
      content: chat_message.content,
      user: chat_message.user.username
    )
  end
end
