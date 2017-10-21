require 'json'

module Api::V1
  class BetsController < ApplicationController
    def index
        @bets = Bet.all
        render json: @bets
      
    end
  end


end
