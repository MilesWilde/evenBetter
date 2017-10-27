class AddIdBackToBetsUsers < ActiveRecord::Migration[5.1]
  def up
    execute 'ALTER TABLE bets_users ADD COLUMN id SERIAL PRIMARY KEY;'
  end
  def down
    execute 'ALTER TABLE bets_users DROP COLUMN id;'
  end
end
