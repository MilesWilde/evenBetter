require 'rails_helper'

RSpec.describe 'Bets API v1', type: :request do
  # initialize the test data
  let(:user) { create(:user) }
  let(:users) { create_list(:user, 10) }
  let!(:bets) { create_list(:bet, 10, creator: user, users: [user]) }
  let(:bet_id) { bets.first.id }
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

  describe 'GET /api/v1/bets/:id' do
    before { get "/api/v1/bets/#{bet_id}", headers: headers}

    context 'when the record exists' do
      it 'returns the bet' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(bet_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:bet_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns not found message' do
        expect(response.body).to match(/Couldn't find Bet/)
      end
    end
  end

  # test suite for POST /api/v1/bets
  describe 'POST /api/v1/bets' do

    let(:valid_attributes) { {
      title: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      betting_deadline: Time.now + 1.day,
      outcome_deadline: Time.now + 2.day,
      users: [users.map { |user| user.id }],
      possibilities: [
        Faker::Commerce.product_name,
        Faker::Commerce.product_name
      ]
    } }

    context 'when the request is valid' do
      before { post '/api/v1/bets', params: valid_attributes.to_json, headers: headers }

      it 'creates a bet' do
        expect(json['details']['title']).to eq(valid_attributes[:title])
      end

      it 'returns the status code 201' do
        expect(response).to have_http_status(201)
      end

    end

    context 'when the request is invalid' do
      before { post '/api/v1/bets', params: { title: 'foobar' }.to_json, headers: headers }

      it 'returns the status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a valid failure message' do
        expect(response.body).to match(/Validation failed: Betting deadline can't be blank/)
      end
    end

  end

end
