class UsersController < ApplicationController
    skip_before_action :signed_in?, only: [:create]

    def create
       

        user = User.new(userParams)
        
        if user.save
            token = Auth.create_token({:name=> user.name, :id=> user.id})
            render json: {token: token, package: {name: user.name, id: user.id}}         
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
