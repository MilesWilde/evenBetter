require 'json'

module Api::V1
  class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end

    def bets
        @bets = User.find(params[:user_id]).bets
        render json: @bets
    end
  end


end
