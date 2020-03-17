
class KitsController < ApplicationController
    
    def create
        byebug
    end

    def index       
        render json: Kit.all
    end

    def destroy
    end
    
end
