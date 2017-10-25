module Api::V1
  class MessagesController < ApplicationController

    def show
      @messages = Bet.find(params[:bet_id]).messages
    end

  end
end
