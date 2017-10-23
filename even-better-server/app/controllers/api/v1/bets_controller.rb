require 'json'

module Api::V1
  class BetsController < ApplicationController
    before_action :set_bet, only: [:show, :update, :destroy]

    def index
        @bets = current_user.bets
        render json: @bets
    end

    def create
      @user_ids = params[:users] || []
      @possibilities = params[:possibilities] || []
      @user_ids.push(current_user.id)
      @users = User.where(id: params[:users])
      # need to validate number of users in controller
      # can't add them and call save because it tries to create them in the users table
      if @users.length >= 2
        @bet = current_user.owned.new(bet_params)
        # add the possibilities
        @possibilities.map{ |possibility| @bet.possibilities.build(description: possibility) }
        @bet.save!
        # Add users to the bet
        @users.map{ |user| @bet.users << user }
        render json: @bet.to_json({ include: [:possibilities, :users] }), status: :created
      else
        render json: { message: "Validation failed: Users must have at least 2 users"}, status: :unprocessable_entity
      end
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
