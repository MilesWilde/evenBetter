require 'json'

module Api::V1
  class BetsController < ApplicationController
    def index
        @bets = Bet.all
        render json: @bets
    end

    def create
      bet = current_user.bets.create(
        title: params[:title],
        description: params[:description],
        betting_deadline: params[:betting_deadline],
        outcome_deadline: params[:outcome_deadline],
        creator: current_user,
        mediator_id: params[:mediator_id] || nil
      )

      # Add users to the bet
      params[:users].map{ |id| BetUser.create(bet: bet, user_id: id) }
    end

    def show
        @bet = Bet.find params[:id]
    end

    def destroy
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
