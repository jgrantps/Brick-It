class SelectionSerializer
  include FastJsonapi::ObjectSerializer
  attributes 
  belongs_to :user
  belongs_to :kit
  

end
