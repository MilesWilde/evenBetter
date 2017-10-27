class Api::V1::PossibilitiesController < ApplicationController
  def index
    @possibilities = Possibility.where(bet_id: params[:bet_id])
    render json: @possibilities
  end
end
