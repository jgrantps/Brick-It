class KitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  belongs_to :theme
end
