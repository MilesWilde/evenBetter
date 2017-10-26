class AddHasAcceptedToBetsUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :bets_users, :has_accepted, :boolean
  end
end
