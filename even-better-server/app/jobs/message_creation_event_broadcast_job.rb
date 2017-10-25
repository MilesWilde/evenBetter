class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(chat_message)
    ActionCable
    .server
    .broadcast(
      'chat_channel',
      id: chat_message.id,
      created: chat_message.created_at.strftime('%H:%M'),
      content: chat_message.content
    )
  end
end
