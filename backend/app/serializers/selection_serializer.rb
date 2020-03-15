class SelectionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :user_id, :kit_id, :public
  belongs_to :user
  belongs_to :kit
  

end
