module Api::V1
    class UsersController < ApplicationController
      def index
        # @user = User.create! {
        #     username: "NotBatman",
        #     first_name: "Brunce",
        #     last_name: "Wayne",
        #     email: "totallynotbatman@gotham.com",
        #     points: 1000,
        #     password_hash: "12345"
        # } 
        @users = User.all
        render json: @users
      end
    end
  end