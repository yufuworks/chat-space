require 'rails_helper'

describe Chat, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid with a message" do
        expect(build(:chat, image: nil)).to be_valid
      end

      it "is valid with a image" do
        expect(build(:chat, message: nil)).to be_valid
      end
      
      it "is valid with a message and a image" do
        expect(build(:chat)).to be_valid
      end
    end
    context 'can not save' do
      it "is invalid without a message and a image" do
        chat = build(:chat, message: nil, image: nil)
        chat.valid?
        expect(chat.errors[:message]).to include("can't be blank")
      end
  
      it "is invalid without a group_id" do
        chat = build(:chat, group_id: nil)
        chat.valid?
        expect(chat.errors[:group]).to include("must exist")
      end
  
      it "is invalid without a user_id" do
        chat = build(:chat, user_id: nil)
        chat.valid?
        expect(chat.errors[:user]).to include("must exist")
      end
    end
  end
end