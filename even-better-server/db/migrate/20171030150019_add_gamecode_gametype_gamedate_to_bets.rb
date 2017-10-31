class AddGamecodeGametypeGamedateToBets < ActiveRecord::Migration[5.1]
  def up
    add_column :bets, :game_date, :date
    add_column :bets, :game_type, :string
    add_column :bets, :game_code, :bigint
  end

  def down
    remove_column :bets, :game_date, :date
    remove_column :bets, :game_type, :string
    remove_column :bets, :game_code, :bigint
  end
end
