# JWT.encode(payload, 'mysecret', 'HS256') #// JWT.encode(payload, JWT["AUTH_SECRET"], JWT["AUTH_ALG"])
require 'jwt'
require 'byebug'

class Auth

    def self.create_token(user_object)
        
        secret = Rails.application.credentials.JWT[:AUTH_SECRET]
        algo = Rails.application.credentials.JWT[:AUTH_ALG]
        payload={ user: JSON.parse(user_object.to_json) }
        JWT.encode(payload, Rails.application.credentials.JWT[:AUTH_SECRET], Rails.application.credentials.JWT[:AUTH_ALG])

    end

    def self.decode_token(token)
        salt = Rails.application.credentials.JWT[:AUTH_SECRET]
        algo = Rails.application.credentials.JWT[:AUTH_ALG]
        
        begin
            decoded_results = JWT.decode(token, salt, true, { algorithm: algo })
        rescue JWT::JWKError
            decoded_results = "JWK Error"
        
        rescue JWT::DecodeError
            decoded_results = "Error"               
        end
        
        decoded_results
    end
end


