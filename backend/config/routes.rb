Rails.application.routes.draw do
  post '/login', to: 'sessions#create'
  get 'session/destroy'
  
  resources :themes
  resources :kits
  resources :comments
  resources :selections
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end