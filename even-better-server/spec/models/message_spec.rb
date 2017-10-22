require 'rails_helper'

RSpec.describe Message, type: :model do

  context 'Validations' do
    it { should validate_presence_of(:user) }
    it { should validate_presence_of(:bet) }
    it { should belong_to(:user) }
    it { should belong_to(:bet) }

    it 'should create a messsage' do
      msg = FactoryGirl.build(:message)
      expect(msg).to be_a(Message)
    end
  end

end
