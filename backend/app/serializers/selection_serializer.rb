class SelectionSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :user_id, :kit_id, :public, :kit, :comments
  attributes :public, :user, :kit, :comments
 
  belongs_to :user
  belongs_to :kit
  # belongs_to :theme, through: :kit
  has_many :comments
  
  

end
