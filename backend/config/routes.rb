Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/auth/:provider/callback', to: 'sessions#create'
  get '/omniauth', to: 'sessions#GitHub'
  
  resources :themes
  resources :kits
  resources :comments
  resources :selections
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
