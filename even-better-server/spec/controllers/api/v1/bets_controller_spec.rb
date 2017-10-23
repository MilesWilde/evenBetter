require 'rails_helper'

RSpec.describe 'Bets API v1', type: :request do
  # initialize the test data
  let(:user) { create(:user) }
  let!(:bets) { create_list(:bet, 10, creator: user, users: [user]) }
  let(:id) { bets.first.id }
  let(:headers) { valid_headers }

  # test suite for GET /api/v1/bets
  describe 'GET /api/v1/bets' do

    before { get '/api/v1/bets', headers: headers}

    it 'returns bets' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # test suite for POST /api/v1/bets
  describe 'POST /api/v1/bets' do

    let(:valid_attributes) { {
      title: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      betting_deadline: Time.now + 1.day,
      outcome_deadline: Time.now + 2.day,
      users: [523, 524, 525],
      possibilities: [
        Faker::Commerce.product_name,
        Faker::Commerce.product_name
      ]
    }.to_json }

    context 'when the request is valid' do
      before { post '/api/v1/bets', params: valid_attributes, headers: headers }

      # it 'creates a bet' do
      #   expect(json['title']).to eq(valid_attributes.title)
      # end

      it 'returns the status code 201' do
        expect(response).to have_http_status(201)
      end

    end

  end

end
