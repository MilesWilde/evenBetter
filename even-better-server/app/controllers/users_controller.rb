# app/controllers/users_controller.rb
class UsersController < ApplicationController
  skip_before_action :authorize_request, only: :create
  # POST /signup
  # return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: TokenMessage.account_created, auth_token: auth_token }
    json_response(response, :created)
  end

  def add_to_bet(bet)
    BetUser.create(user_id: self.id, bet_id: bet.id)
  end

  private

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :username,
      :password,
      :password_confirmation
    )
  end
end
