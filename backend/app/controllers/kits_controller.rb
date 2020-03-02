
class KitsController < ApplicationController
    before_action :signed_in?
    def create
    end

    def index
        
            render json: Kit.all
    
            # render error
        # end
        # token = request.env["HTTP_AUTHORIZATION"]
        # decode_results = Auth.decode_token(token)

        # case decode_results
        # when "Error"
        # when "JWK Error"
        #     render json: {error: {message: "Web Key is Invalid Or Missing"}} 
        # else 
        #     byebug
        #     render json: Kit.all
        # end   
    end

    def destroy
    end
    
end
