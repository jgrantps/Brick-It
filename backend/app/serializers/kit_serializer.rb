class KitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :set_img_url, :theme_id, :set_num, :year, :set_url, :theme
  belongs_to :theme
end
