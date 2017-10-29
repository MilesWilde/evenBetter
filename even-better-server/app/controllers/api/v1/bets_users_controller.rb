class Api::V1::BetsUsersController < ApplicationController
  def update
    # Finds bet_user using user_id and bet_id
    @betUser=BetUser.where(user_id: current_user[:id]).find_by(bet_id: params[:bet_id])
    @betUser[:has_accepted] = params[:has_accepted]
    @betUser[:possibility_id] = params[:possibility_id]
    @betUser.save
    # Returning json to make sure column has been updated
    render json: @betUser
    #binding.pry
  end

  def index
    @bets_users=BetUser.where(user_id: current_user[:id])
    render json: @bets_users
  end
end
