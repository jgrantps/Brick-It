class User < ApplicationRecord
    has_secure_password

    has_many :selections
    has_many :kits, through: :selections
    has_many :comments, through: :selections

    validates :name, :presence => true
    validates :name, :uniqueness => true

    validates :password, :presence => true

    def self.public_users
        aa = []
        self.all.each do |i|
            aa.push(i) if (i.selections.detect {|e| e.public == true })
        end
        aa
    end



end
