require 'json'

module Api::V1
  class BetsController < ApplicationController
    before_action :set_bet, only: [:show, :update, :destroy]

    def index
        @bets = current_user.bets
        render json: @bets
    end

    def create
      @bet = current_user.owned.create!(bet_params)
      @bet.users << current_user
      # Add users to the bet
      params[:users].map{ |id| @bet.users << User.find(id) }
      params[:possibilities].map{ |possibility| @bet.possibilities.create!(description: possibility) }
      render json: @bet.to_json({ include: [:possibilities, :users] }), status: :created
    end

    def show
      render json: @bet.to_json({ include: [:possibilities, :users] })
    end

    def destroy
    end

    private

    def bet_params
      params.permit(:title, :description, :betting_deadline, :outcome_deadline, :mediator_id, :users, :possibilities)
    end

    def set_bet
      @bet = Bet.find(params[:id])
    end
  end

end

# create bet JSON payload
# {
# 	"title": "Test Create",
# 	"description": "testing a description",
# 	"betting_deadline": "2017-10-23 15:46:07 -0400",
# 	"outcome_deadline": "2017-10-24 15:46:07 -0400",
# 	"users": [523, 524, 525]
# }
