class AddsForeignKeyToBets < ActiveRecord::Migration[5.1]
  def change
    # need to create another migration adding this in at the end
    add_reference :bets, :outcome, foreign_key: { to_table: :possibilities }
  end
end
