# app/assets/javascripts/cable/subscriptions/web_notifications.coffee
# Client-side which assumes you've already requested
# the right to send web notifications.
App.cable.subscriptions.create "WebNotificationsChannel",
  received: (data) ->
    new Notification data["title"], body: data["body"]
