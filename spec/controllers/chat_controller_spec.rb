require 'rails_helper'

describe ChatsController, type: :controller do
  let(:user) {create(:user)}
  let(:group) { create(:group) }

  describe "#index" do
    
    context "if user signed in" do
      
      before do
        login user
        get :index, params: {group_id: group.id}
      end
      
      it "assigns @chat" do
        expect(assigns(:chat)).to be_a_new(Chat)
      end
      
      it "assigns @group " do
        expect(assigns(:group)).to eq group
      end
      
      it "renders index" do
        expect(response).to render_template :index
      end

    end
    
    context "if user not signed in" do
  
      before do
        get :index, params: {group_id: group.id}
      end
      it "redirects to new_user_session_path" do
        expect(response).to redirect_to(new_user_session_path) 
      end
  
    end
  end

  describe "#create" do
  let(:params) { { group_id: group.id, user_id: user.id, chat: attributes_for(:chat) } }
  let(:invalid_params) { { group_id: group.id, user_id: user.id, chat: attributes_for(:chat, message: nil, image: nil) } }

    context "if signed in" do
      before do
        login user
      end
      
      context "could save a record" do
        subject {
          post :create,
          params: params
        }
        it "count up message" do
          expect{ subject }.to change(Chat, :count).by(1)
        end
        it "redirects to group_chats_path" do
          subject
          expect(response).to redirect_to(group_chats_path(group))
        end
      end
      context "couldn't save a record" do
        
        subject {
          post :create,
          params: invalid_params
        }

        it "does not count up" do
          expect{ subject }.not_to change(Chat, :count)
        end
        it "renders index" do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context "if not signed in" do
      it "redirects to new_user_session_path" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
