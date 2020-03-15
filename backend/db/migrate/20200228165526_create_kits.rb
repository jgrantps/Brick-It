class CreateKits < ActiveRecord::Migration[6.0]
  def change
    create_table :kits do |t|
      t.string :name
      t.string :set_img_url
      t.string :theme_id
      t.string :set_num
      t.integer :year
      t.integer :num_parts
      t.string :set_url
      t.string :last_modified_dt

      t.timestamps
    end
  end
end
