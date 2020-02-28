class CreateThemes < ActiveRecord::Migration[6.0]
  def change
    create_table :themes do |t|
      t.string :api_id
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
