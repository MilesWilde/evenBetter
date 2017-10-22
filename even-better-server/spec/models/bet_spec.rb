require 'rails_helper'

RSpec.describe Bet, type: :model do

  context 'validations' do

    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:betting_deadline) }
    it { should validate_presence_of(:outcome_deadline) }
    it { should validate_presence_of(:creator) }

    it 'should create a Bet object' do
      bet = FactoryGirl.build(:bet)
      expect(bet).to be_a(Bet)
    end

  end

end
