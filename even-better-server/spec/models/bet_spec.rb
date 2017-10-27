require 'rails_helper'

RSpec.describe Bet, type: :model do

  context 'validations' do
    it { should have_and_belong_to_many(:users) }
    it { should belong_to(:creator) }
    it { should have_many(:messages) }
    it { should have_many(:possibilities) }
    it { should belong_to(:mediator) }
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:creator) }

    it 'should create a Bet object' do
      bet = FactoryGirl.build(:bet)
      expect(bet).to be_a(Bet)
    end

  end

end
