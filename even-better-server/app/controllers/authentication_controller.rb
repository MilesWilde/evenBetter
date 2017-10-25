# app/controllers/authentication_controller.rb
class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate
  # return auth token once user is authenticated
  def authenticate
    auth_token = 
      AuthenticateUser.new(auth_params[:email], auth_params[:password]).call
    user = User.find_by(email: auth_params[:email])
    user_bets = BetUser.where(user_id: user.id).count
    # user_bets = user.bet_users.count(:user_id)
    # maybe user_bets = user.bet_users.count(user.id)
    json_response(auth_token: auth_token, user_id: user.id, user_points: user.points, user_bets: user_bets, first_name: user.first_name, last_name: user.last_name)
  end

  private

  def auth_params
    params.permit(:email, :password)
  end
end
