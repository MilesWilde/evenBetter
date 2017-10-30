require 'json'

module Api::V1
  class BetsController < ApplicationController
    before_action :set_bet, only: [:show, :update, :destroy]

    def index
        @bets = current_user.bets
        render json: @bets
    end

    def create
      # binding.pry
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
        @bet.users << User.find(params[:mediator_id]) if params[:mediator_id]
        render json: @bet.to_json({ include: [:possibilities, :users] }), status: :created
      else
        json_response({ message: "Validation failed: Users must have at least 2 users"}, :unprocessable_entity)
      end
    end

    def show

      render json: @bet.to_json({
        include:
          [
            :possibilities,
            :users,
            :creator,
            :mediator
          ]
      })
      # when a user goes to his landing page
      # checks all bets if they have a possibility_id
      # if they don't have a possibility_id,
      # it should check the api/v1/games against the gamecode of that bet
      # if the gamecode's gameWinner is !null
      # then set the possibility_id to be equal to the possibility_id in possibilities
      # then go through betuser table looking for people who selected that possibility
      # increment their points by the pool of that bet divided by the count of the betuser table

      finished_games = []
      # find current user's bets where it's a sport bet that gamedate occurs today or earlier
      # unfinished_game_array = Bet.where(outcome_id: nil).where(user_id: current_user.id).where(game_code: !nil).where("game_date <= ?", Date.today)
      # check api/v1/games for gamecodes of unfinished_game_array
      # # something like:
      # # loop through all games without outcome chosen
      # unfinished_game_array.each do |unfinished_game|
      # # loop through each game on api occurring of that type and on that day 
      # (e.g.) unfinished_game.date = 2017-10-31, unfinished_game.type = "NBA"
      #   api/v1/games(unfinished_game.game_type, unfinished_game.game_date).each do |sport_game|
      # # if game on api gamecode is the game without outcome, and the api game winner has been chosen
      #     if sport_game.gamecode === unfinished_game.gamecode && sport_game.gameWinner !== nil
      # # look at all possibilities with a bet_id equal to the game without an outcome
      #       Possibility.where(bet_id: unfinished_game.bet_id).each do |possibility|
      # # and find if the possibility name is the name of the winning team
      #         if possibility.name === winning_team
      # # then set the game without a possibility's possibility id to the correct winning team's possibility id
      #           unfinished_game.possibility_id = possibility.id
      #           possibility.save
      #           BetUser.where(possibility_id: possibility.id).each do |betuser_winner|
      #             winner = User.find(betuser_winner.user_id)
      #             winner.points += unfinished_game.pool/BetUser.where(bet_id: unfinished_game.id).count
      #             winner.save
      #           end
      #         end
      #       end
      #     end
      #   end
      # end
    end

    def user_possibilities
      @possibilities = Bet.find(params[:bet_id]).bet_users
      render json: @possibilities, only: [:user_id, :possibility_id, :has_accepted]
    end

    def update
      @bet = Bet.find(params[:id])
      if @bet.mediator != current_user
        #Use not acceptable (406) instead of 403
        json_response({ message: 'Validation failed: Only the mediator can set the outcome' }, :forbidden)
      elsif @bet.outcome_id
        json_response({ message: 'Validation failed: An outcome has already been set' }, :forbidden)
      elsif !@bet.possibilities.exists?(params[:outcome_id])
        json_response({ message: 'Validation failed: Cannot select a possibility from another bet' }, :forbidden)
      else
        @bet.outcome_id = params[:outcome_id]
        @bet.save!
        render json: @bet.to_json({ include: [:possibilities, :users, :creator, :mediator] })

        # ---THIS IS UNTESTED ---
        # bet_user_count = BetUser.where(bet_id: bet_id).count
        # pool = Bet.where(bet_id: bet_id).pool
        # winnings = pool / bet_user_count

        # BetUser.where(possibility_id: outcome).each do |winner|
        #   winner.user.points += winnings
        #   winner.save!
        # end

      end
    end

    def destroy
    end

    def get_invites
      @created_bet_ids = current_user.created_bets.select(:id)
      @mediated_bet_ids = current_user.mediated_bets.select(:id)
      @invites = current_user.bet_invites.where.not(id: @created_bet_ids).where.not(id: @mediated_bet_ids)
      render json: @invites
    end

    def get_med_reqs
      @mediated_bet_ids = current_user.mediated_bets.select(:id)
      @mediation_requests = current_user.bet_invites.where(id: @mediated_bet_ids)
      render json: @mediation_requests
    end

    def get_acceptances
      @acceptances = current_user.bet_acceptances
      render json: @acceptances
    end

    def find_creator
      @bet = Bet.find(params[:bet_id])
      @user = User.find(@bet[:creator_id])
      render json: @user
    end

    private

    def bet_params
      params.permit(:title, :pool, :description, :betting_deadline, :outcome_deadline, :mediator_id, :users, :possibilities, :game_type, :game_date, :game_code)
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
