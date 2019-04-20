Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :edit, :update, :create] do
    resources :chats, only: [:create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
