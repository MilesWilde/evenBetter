require 'json'

module Api::V1
  class BetsController < ApplicationController
    before_action :set_bet, only: [:show, :update, :destroy]
    before_action :update_sports_bets, only: [:get_acceptances]

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
        @bet.pool = 0
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
    end

    def user_possibilities
      @possibilities = Bet.find(params[:bet_id]).bet_users
      render json: @possibilities, only: [:user_id, :possibility_id, :has_accepted]
    end

    def update
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
        distribute_points_among_winners(@bet, Possibility.find(params[:outcome_id]))
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
      params.permit(:title, :description, :betting_deadline, :outcome_deadline, :mediator_id, :users, :possibilities, :game_type, :game_date, :game_code)
    end

    def set_bet
      @bet = Bet.find(params[:id])
    end

    def update_sports_bets
      # This should be changds to a background process later
      bets_to_check = current_user.bets.where.not({ game_code: nil }).where({ game_date: (Date.today - 1.year)..Date.today, outcome_id: nil })

      params_to_check = bets_to_check.select(:game_date, :game_type).distinct

      params_to_check.each do |params|
        game_list = JSON(SportsHelper::stat_scraper(params.game_type, params.game_date.to_s.tr('-', '')))['games']

        game_list.each do |game|
          if game['gameWinner']
            bets_to_update = bets_to_check.where(game_code: game['gameCode'].to_i)

            bets_to_update.each do |bet|
              outcome = bet.possibilities.find_by description: game['gameWinner']
              bet.outcome = outcome
              bet.save!
              distribute_points_among_winners(bet, outcome)
            end
          end
        end
      end
    end

    def distribute_points_among_winners(bet, outcome)
      winners = bet.users.find(bet.bet_users.where(possibility: outcome).map{ |bet_user| bet_user.user_id })

      if winners.length > 0 # if there is a winner
        points_per_winner = bet.pool / winners.length
        winners.each do |winner|
          winner.points += points_per_winner
          winner.save!(validate: false)
        end
      else # if no one won
        participants = bet.users.find(bet.bet_users.where(has_accepted: true).map{ |bet_user| bet_user.user_id })
        participants.each do |participant|
          participant.points += 100
          participant.save!(validate: false)
        end
      end
    end
  end

end
