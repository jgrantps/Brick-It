class Comment < ApplicationRecord
    belongs_to :selection
    belongs_to :user
    
    validates :comment, :presence => true

    

    
end
