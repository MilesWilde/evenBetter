Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :show]
      get 'bets/invites', to: 'bets#get_invites'
      get 'bets/acceptances', to: 'bets#get_acceptances'
      get 'bets/:bet_id/creator', to: 'bets#find_creator'
      resources :bets, except: [:destroy] do
        resources :messages, only: [:index]
      end
      resources :users, except: [:create, :destroy] do
        get '/bets', to: 'users#bets#index'
      end
    end
  end
end

