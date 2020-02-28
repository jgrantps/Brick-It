class CreateSelections < ActiveRecord::Migration[6.0]
  def change
    create_table :selections do |t|
      t.string :user_id
      t.string :kit_id
      t.boolean :public

      t.timestamps
    end
  end
end
