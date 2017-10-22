require 'rails_helper'

RSpec.describe Possibility, type: :model do

  context 'Validations' do
    it { should belong_to(:bet) }
    it { should have_many(:users) }
  end

end
