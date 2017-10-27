module ApplicationCable
  class Channel < ActionCable::Channel::Base
    before_subscribe :authorize_request
    attr_reader :current_user

    private

    def authorize_request
      @current_user = (AuthorizeApiRequest.new(params).call)[:user]
    end
  end
end
