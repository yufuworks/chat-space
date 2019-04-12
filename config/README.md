## usersテーブル
<!--
groupsと多対多の関係
TODO:
user削除時の挙動、投稿済みのコメント（イメージ）は残してnull時のデフォルトname表示が必要？
削除時のnull専用のuserを予め登録しておく？要調査だがひとまず保留、あとで修正対応かも。
 -->
|Column|Type|Options|
|------|----|-------|
|id|ingeger|null: false|
|nickname|string|null: false|
|email|string|null: false|

### Association
has_many :groups_users
has_many :groups, through: :groups_users
has_many :comments
has_many :images

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false, default: false|

### Association
has_many :groups_users
has_many :users, through: :groups_users

## groups_usersテーブル(class_name: members)

<!-- 
グループ編集件をどのように設定するか。
グループ作成userのmastar判定をtrueとし権限を与える
フォームから追加されたメンバーにはデフォルト設定のfalseを入れる
もし必要ないなら（全員mastarにするなどの場合）mastarカラムは後々削除
 -->

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|master|bool|null: false|

### Association
belongs_to :group
belongs_to :user

## commentsテーブル
<!-- 
userを削除した時紐付けがどうなるのか。
通常表示するuser.nameをどうすれば良いか。
 -->

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|comment|text|null: false|
|image_id|int|null: ture|

### Association
has_one :image


## imagesテーブル

<!-- 
要gem
Avatar?もしくは記事が出てくるCarrierWaveを試してみる？
 -->

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|image|string|null] false|

### Association
has_one :comment

##Index
<!-- 
書込み頻度が低く（一度作成したグループの編集頻度は低いはず？）
呼び出しが多く、それぞれのカラムの値の種類が多い
 -->

add_index groups_users, [:user_id, :group_id]