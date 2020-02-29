require 'Auth'
require 'byebug'
class ApplicationController < ActionController::API
   
    
    
    
    def signed_out?
        return true if !!current_user != true
      end
    
    def signed_in?
        !!current_user
      end

    def current_user
        @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

end
