module Api::V1
  class MessagesController < ApplicationController

    def index
      @messages = Bet.find(params[:bet_id]).messages
      render json: @messages.to_json( { only: [:id, :content, :created_at], include: { user: { only: :username }}}), status: :ok
    end

  end
end
