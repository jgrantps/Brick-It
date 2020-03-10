class SessionsController < ApplicationController
  skip_before_action :signed_in?, only: [:create]
  
  require 'open-uri'

  def create
   
    if request.env["omniauth.auth"]
      # log in with omniauth data
      oauth_username = request.env["omniauth.auth"]["info"]["nickname"]
      if user = User.find_by(:name => oauth_username)
        # if already a user in the db.
        token = Auth.create_token({:name=> user.name, :id=> user.id})     
        # pass token to frontend as param to be stored in window.localstorage.token
        redirect_to "http://localhost:3000/login/github/?token=#{token}&name=#{user.name}&id=#{user.id}"
      else
        user = User.new(:name => oauth_username, :password => SecureRandom.base36)
        # creates a new user based on GitHub credentials.
        if user.save
          token = Auth.create_token({:name=> user.name, :id=> user.id})
          # pass token to frontend as param to be stored in window.localstorage.token
          redirect_to "http://localhost:3000/login/github/?token=#{token}&name=#{user.name}&id=#{user.id}"
        else
          # pass error to frontend as param to be processed accordingly.
          redirect_to "http://localhost:3000/login/github/?token=error"
        end
      end

        

    else
      
      # Normal login with username and password
      user = User.find_by(:name => sessionParams[:name])
      if user && user.try(:authenticate, sessionParams[:password])
        token = Auth.create_token({:name=> user.name, :id=> user.id})
        render json: {token: token, package: {name: user.name, id: user.id}}
      else
        
        render json: {error: "Login Failed: Name and/or Password are incorrect.  Please try again!"}
      end
    end
  
  end

  def destroy
    # byebug
    reset_session
    render json: {message: "you are logged out"}
  end

  private

  def sessionParams
    params.require(:session).permit(:name, :password)
  end

end
