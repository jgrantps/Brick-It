class UsersController < ApplicationController
    skip_before_action :check_token, only: [:create]

    def create
       

        user = User.new(userParams)
        
        if user.save
            
            render json: user          
        else
            render json: {main: user.errors.as_json(full_messages: true), reason: "error!"}
        end
        
    end

    def show
    end

    
   

    private
    
    def userParams
        params.permit(:name, :password)
    end

    
end
