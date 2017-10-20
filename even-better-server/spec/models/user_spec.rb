require 'rails_helper'

RSpec.describe User, type: :model do

  context 'validations' do
    it { should validate_presence_of(:first_name) }
    it { should validate_presence_of(:last_name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_length_of(:password_digest).is_at_least(8)}

    it 'should create a user object' do
      user = FactoryGirl.build(:user)
      expect(user).to be_a(User)
    end
  end
end
