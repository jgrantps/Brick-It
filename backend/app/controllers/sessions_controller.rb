

class SessionsController < ApplicationController
  
  def create
    user = User.find_by(:name => sessionsParams[:name])
    
    if user&& user.authenticate(sessionsParams[:password])
       
    #  render json: {message: "hi there"}
     render json: {token: Auth.create_token({name: user.name, id: user.id })}
    else
      render json: {message: "Login Failed, Please Try Again!"}
    end
  
  end

  def destroy
    reset_session
    render json: {message: "you are logged out"}
  end

  private

  def sessionsParams
    params.require(:session).permit(:name, :password)
  end

end
