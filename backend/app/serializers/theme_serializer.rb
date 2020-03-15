class ThemeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :api_id
end
