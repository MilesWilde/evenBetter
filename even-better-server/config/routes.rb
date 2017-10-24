Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :games, only: [:index, :show]
      resources :bets, except: [:destroy] do
        resources :messages, only: [:index]
      end
      resources :users, except: [:create, :destroy]
    end
  end
end

