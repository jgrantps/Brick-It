

class SessionsController < ApplicationController
  
  def create
    user = User.find_by(:name => sessionsParams[:name])
    
    if user&& user.authenticate(sessionsParams[:password])
     render json: {token: Auth.create_token({name: user.name, id: user.id })}

     
    #  this render result is to be stored in the ${window.localstorage.setItem('Token', renderResult)}
    #  This local storage item is then included in the header of all fetch requests to the backend, id:
    #   let token = window.localstorage.getItem('Token')
      
      # fetch('http://localhost3000/kits', {
      #   method: 'GET',
      #   headers: {
      #     'Authorization': Token
      #     }
      #   })
      # .then(response => response.json())
      # .then(json => console.log(json))
      # .cateh(err => console.log(err))
    
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
