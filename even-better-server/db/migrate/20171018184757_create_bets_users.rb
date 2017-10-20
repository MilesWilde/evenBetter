class CreateBetsUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :bets_users do |t|
      t.references :bet, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.references :possibility, index: true, foreign_key: true

      t.timestamps
    end
  end
end
