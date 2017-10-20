class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.references :user, index: true, foreign_key: true
      t.references :bet, index: true, foreign_key: true

      t.timestamps
    end
  end
end
