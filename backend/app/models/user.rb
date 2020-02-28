class User < ApplicationRecord
    has_secure_password

    has_many :selections
    has_many :kits, through: :selections
    has_many :comments, through: :selections

    validates :name, :presence => true
    validates :name, :uniqueness => true

end
