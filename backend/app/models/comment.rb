class Comment < ApplicationRecord
    belongs_to :selection
    belongs_to :user
    
end
