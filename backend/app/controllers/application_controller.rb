require 'Auth'
require 'byebug'
class ApplicationController < ActionController::API
  before_action :signed_in?
    
    def signed_out?
        return true if !!current_user != true
      end
    
    def signed_in?
      !!current_user
    end
    
    def current_user
      token = request.env["HTTP_AUTHORIZATION"]
      
      if token != 'undefined'
        return @current_user ||= User.find(Auth.decode_token(token).first["user"]["id"]) if token      
      else
        render json: {error: {message: "Web Token is Invalid Or Missing"}}
        return false
      end
    end
end
