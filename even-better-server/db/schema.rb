# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171030150019) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", force: :cascade do |t|
    t.string "title"
    t.integer "pool"
    t.datetime "betting_deadline"
    t.datetime "outcome_deadline"
    t.string "description"
    t.bigint "mediator_id"
    t.bigint "creator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "outcome_id"
    t.date "game_date"
    t.string "game_type"
    t.integer "game_code"
    t.index ["creator_id"], name: "index_bets_on_creator_id"
    t.index ["mediator_id"], name: "index_bets_on_mediator_id"
    t.index ["outcome_id"], name: "index_bets_on_outcome_id"
  end

  create_table "bets_users", id: :serial, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bet_id", null: false
    t.bigint "possibility_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "has_accepted"
    t.index ["possibility_id"], name: "index_bets_users_on_possibility_id"
    t.index ["user_id", "bet_id"], name: "index_bets_users_on_user_id_and_bet_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.bigint "user_id"
    t.bigint "bet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bet_id"], name: "index_messages_on_bet_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "possibilities", force: :cascade do |t|
    t.string "description"
    t.bigint "bet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bet_id"], name: "index_possibilities_on_bet_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.integer "points"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "bets", "possibilities", column: "outcome_id"
  add_foreign_key "bets", "users", column: "creator_id"
  add_foreign_key "bets", "users", column: "mediator_id"
  add_foreign_key "bets_users", "possibilities"
  add_foreign_key "messages", "bets"
  add_foreign_key "messages", "users"
  add_foreign_key "possibilities", "bets"
end
