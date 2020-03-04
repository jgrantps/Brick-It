class KitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :image_url
  belongs_to :theme
end
