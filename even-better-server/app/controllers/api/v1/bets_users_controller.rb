class Api::V1::BetsUsersController < ApplicationController
  def update
    puts "Api::V1::BetsUsersController update"
    puts params.inspect
    # Finds bet_user using user_id and bet_id
    @betUser=BetUser.where(user_id: current_user[:id]).find_by(bet_id: params[:bet_id])
    puts "@betUser"
    puts @betUser.inspect
    @betUser[:has_accepted] = params[:has_accepted]
    puts "hello"
    @betUser.save
    puts @betUser.errors.inspect
    # Returning json to make sure column has been updated
    render json: @betUser
    #binding.pry
  end

end
