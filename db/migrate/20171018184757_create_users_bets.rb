class CreateUsersBets < ActiveRecord::Migration[5.1]
  def change
    create_table :users_bets do |t|
      t.references :bets, index: true, foreign_key: true
      t.references :users, index: true, foreign_key: true
      t.references :possibilities, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
