
class KitsController < ApplicationController
    def create
    end

    def index
        token = request.env["HTTP_AUTHORIZATION"]
        decode_results = Auth.decode_token(token)

        case decode_results
        when "Error"
            render json: {error: {message: "Web Token is Invalid Or Missing"}} 
        else 
            
            render json: Kit.all
        end   
    end

    def destroy
    end
    
end
