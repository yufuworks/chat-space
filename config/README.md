## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|ingeger|null: false|
|nickname|string|null: false|
|email|string|null: false|

### Association
has_many :groups_users
has_many :groups, through: :groups_users
has_many :comments

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, default: false|

### Association
has_many :groups_users
has_many :users, through: :groups_users

## groups_usersテーブル(class_name: members)

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
belongs_to :group
belongs_to :user

## commentsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|comment|text|null: false|
|image|string|null: ture|

### Association
belongs_to :users

## Index

add_index groups_users, [:user_id, :group_id]