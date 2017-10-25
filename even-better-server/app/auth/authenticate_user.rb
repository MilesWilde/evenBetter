class AuthenticateUser
  def initialize(email, password)
    @email = email
    @password = password
  end

  # Service entry point
  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_reader :email, :password

  # verify user credentials
  def user
    user = User.find_by(email: email)
    return user if user && user.authenticate(password)
    # raise Authentication error if credentials are invalid
    if !user
      raise(ExceptionHandler::AuthenticationError, TokenMessage.invalid_email)
    else
      raise(ExceptionHandler::AuthenticationError, TokenMessage.invalid_password)
    end
  end
end
