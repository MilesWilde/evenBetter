Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index] do
      end
      resources :games, only: [:index, :show]
      get 'bets/invites', to: 'bets#get_invites'
      get 'bets/:bet_id/creator', to: 'bets#find_creator'
      resources :bets, except: [:destroy] do
        resources :messages, only: [:index]
        resources :possibilities, only: [:index]
      end
      patch 'bets_users/:bet_id', to: 'bets_users#update'
      resources :users, except: [:create, :destroy]
    end
  end
end

