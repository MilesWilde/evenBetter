class Api::V1::BetsUsersController < ApplicationController

  def index
    @betsUsers=BetUser.where(user_id: current_user.id)
    render json: @betsUsers
  end

  def update
    # Finds bet_user using user_id and bet_id
    @betUser = BetUser.find_by(user: current_user, bet_id: params[:bet_id])
    @user = current_user
    @bet = @betUser.bet

    @betUser[:has_accepted] = params[:has_accepted]

    if @bet.mediator != @user && @betUser[:has_accepted] === true
        @user.points -= 100
        @bet.pool += 100
        @betUser[:possibility_id] = params[:possibility_id]
        @bet.save!
        @user.save!(validate: false)
    end

    @betUser.save!
    # Returning json to make sure column has been updated
    render json: @betUser
    #binding.pry
  end

end
