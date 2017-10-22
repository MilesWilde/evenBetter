require 'rails_helper'

RSpec.describe Possibility, type: :model do

  context 'Validations' do
    it { should belong_to(:bet) }
    it { should have_many(:users) }

    it 'should create a possibility' do
      pos = FactoryGirl.build(:possibility)
      expect(pos).to be_a(Possibility)
    end
  end

end
