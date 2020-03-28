class SelectionSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :user_id, :kit_id, :public, :kit, :comments
  attributes :public, :user, :kit
 
  belongs_to :user
  belongs_to :kit
  has_many :comments
  
  

end
