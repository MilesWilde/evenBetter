require 'json'

module Api::V1
  class BetsController < ApplicationController
    def index
        @bets = Bet.all
        render json: @bets
    end

    def create
    end

    def show
        @bet = Bet.find params[:id]
    end

    def destroy
    end
  end


end
