class ChangeBetDealinesToDateTime < ActiveRecord::Migration[5.1]
  def up
    change_column :bets, :betting_deadline, :datetime
    change_column :bets, :outcome_deadline, :datetime
  end

  def down
    change_column :bets, :betting_deadline, :date
    change_column :bets, :outcome_deadline, :date
  end
end
