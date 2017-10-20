class CreatePossibilities < ActiveRecord::Migration[5.1]
  def change
    create_table :possibilities do |t|
      t.string :description
      t.references :bet, index: true, foreign_key: true

      t.timestamps
    end
  end
end
