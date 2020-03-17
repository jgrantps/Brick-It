class SelectionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :kit_id, :public, :kit
  belongs_to :user
  belongs_to :kit
  
  

end
