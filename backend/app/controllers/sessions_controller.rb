class SessionsController < ApplicationController
  skip_before_action :signed_in?, only: [:create]
  
  def create
    user = User.find_by(:name => sessionParams[:name])

    if user&& user.try(:authenticate, sessionParams[:password])
      token = Auth.create_token({name: user.name, id: user.id})
      render json: {token: token}
    else
      render json: {message: "Login Failed, Please Try Again!"}
    end
  
  end

  def destroy
    reset_session
    render json: {message: "you are logged out"}
  end

  private

  def sessionParams
    params.require(:session).permit(:name, :password)
  end

end
