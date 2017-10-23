Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :games, only: [:index, :show]
      resources :bets, only: [:index, :show, :create, :destroy]
      resources :users, except: [:destroy]
    end
  end
end

