class KitSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :set_img_url, :theme_id, :set_num, :year, :set_url, :last_modified_dt, :theme
  belongs_to :theme
end
