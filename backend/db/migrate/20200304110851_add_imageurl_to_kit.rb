class AddImageurlToKit < ActiveRecord::Migration[6.0]
  def change
    add_column :kits, :image_url, :string
  end
end
