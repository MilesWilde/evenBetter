class CreateBetsUsers < ActiveRecord::Migration[5.1]
  def change
    # create_table :bets_users, id: false do |t|
    #   t.references :bet, index: true, foreign_key: true
    #   t.references :user, index: true, foreign_key: true
    #   t.references :possibility, index: true, foreign_key: true

    #   t.timestamps
    # end
    create_join_table :users, :bets do |t|
      t.references :possibility, index: true, foreign_key: true
      t.timestamps
      t.index [:user_id, :bet_id], unique: true
    end

  end
end
