require 'json'

module Api::V1
  class BetsController < ApplicationController
    before_action :set_bet, only: [:show, :update, :destroy]

    def index
        @bets = Bet.all
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
        @bet = current_user.created_bets.new(bet_params)
        # add the possibilities
        @possibilities.map{ |possibility| @bet.possibilities.build(description: possibility) }
        @bet.save!
        # Add users to the bet
        @users.map{ |user| @bet.users << user }
        render json: @bet.to_json({ include: [:possibilities, :users] }), status: :created
      else
        json_response({ message: "Validation failed: Users must have at least 2 users"}, :unprocessable_entity)
      end
    end

    def show
      render json: @bet.to_json({ include: [:possibilities, :users] })
    end

    def update
      if @bet.mediator != current_user
        json_response({ message: 'Validation failed: Only the mediator can set the outcome' }, :forbidden)
      elsif @bet.outcome_id
        json_response({ message: 'Validation failed: An outcome has already been set' }, :forbidden)
      elsif !@bet.possibilities.exists?(params[:outcome_id])
        json_response({ message: 'Validation failed: Cannot select a possibility from another bet' }, :forbidden)
      else
        @bet.outcome = Possibility.find(params[:outcome_id])
        @bet.save!
        json_response(@bet)
      end
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
