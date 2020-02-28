class Selection < ApplicationRecord
    belongs_to :user
    belongs_to :kit
    has_many :comments

end
