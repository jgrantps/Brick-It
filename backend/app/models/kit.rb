class Kit < ApplicationRecord
    has_many :selections
    has_many :users, through: :selections
    belongs_to :theme
end
