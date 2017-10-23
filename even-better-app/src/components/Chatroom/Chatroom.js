import React, { Component } from 'react'
import { ActionCableProvider } from 'react-actioncable-provider'
const cable = ActionCable.createConsumer('ws://localhost:3001/cable')


class App extends Component {
  App.cable.subscriptions.create { channel: "ChatChannel", room: "Best Room" },
  received: (data) ->
    @appendLine(data)

  appendLine: (data) ->
    html = @createLine(data)
    $("[data-chat-room='Best Room']").append(html)

  createLine: (data) ->

    <article class="chat-line">
      <span class="speaker">#{data["sent_by"]}</span>
      <span class="body">#{data["body"]}</span>
    </article>

}