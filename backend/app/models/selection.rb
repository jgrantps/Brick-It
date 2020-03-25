class Selection < ApplicationRecord
    belongs_to :user
    belongs_to :kit
    has_many :comments

    scope :specific_to, -> (name) {where("user_id: ?", name.id)}\
    scope :public, -> { where(public: true) }

end
