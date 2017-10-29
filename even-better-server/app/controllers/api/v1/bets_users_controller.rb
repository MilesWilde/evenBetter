class Api::V1::BetsUsersController < ApplicationController
  def update
    # Finds bet_user using user_id and bet_id
    @betUser=BetUser.where(user_id: current_user[:id]).find_by(bet_id: params[:bet_id])
    @betUser[:has_accepted] = params[:has_accepted]
    @betUser[:possibility_id] = params[:possibility_id]
    @betUser.save
    @user = User.find(current_user[:id])
    # Returning json to make sure column has been updated
    render json: @betUser
    #binding.pry
  end

end

# when a user goes to his landing page
# checks all bets if they have a possibility_id
# if they don't have a possibility_id,
# it should check the api/v1/games against the gamecode of that bet
# if the gamecode's gameWinner is !null
# then set the possibility_id to be equal to the possibility_id in possibilities
# then go through betuser table looking for people who selected that possibility
# increment their points by the pool of that bet divided by the count of the betuser table
# with people who have has_accepted = t