class CreateBets < ActiveRecord::Migration[5.1]
  def change
    create_table :bets do |t|
      t.string :title
      t.integer :pool
      t.date :betting_deadline
      t.date :outcome_deadline
      t.string :description

      t.references :mediator, index: true, foreign_key: { to_table: :users }
      t.references :creator, index: true, foreign_key: { to_table: :users }


      t.timestamps
    end
  end
end
