module Api::V1
  class MessagesController < ApplicationController

    def index
      @messages = Bet.find(params[:bet_id]).messages
      render json: @messages.to_json( { except: [:bet_id, :updated_at], include: { user: { only: :username }}}), status: :ok
    end

  end
end
