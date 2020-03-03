class ThemeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
end
