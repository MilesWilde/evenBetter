require 'nokogiri'
require 'open-uri'
require 'json'

module Api::V1
  class String
    def initial
      self[0,1]
    end
  end

  class GamesController < ApplicationController
    def index

      # params contains the sporttype and gameDate
      puts params.inspect
      puts params["sport"]
      puts params["gameDate"]
      puts params["gameDate"].class.name

      dateForApi = params["gameDate"][0,10].gsub! '-',''

      @scores = SportsHelper::stat_scraper(params["sport"], dateForApi)
      render json: @scores
    end
  end

end
