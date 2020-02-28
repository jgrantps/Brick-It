class CreateKits < ActiveRecord::Migration[6.0]
  def change
    create_table :kits do |t|
      t.string :api_id
      t.string :name
      t.string :description
      t.string :theme_id

      t.timestamps
    end
  end
end
