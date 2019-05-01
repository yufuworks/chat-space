class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  process :fix_exif_rotation

  process :fix_rotate

  # アップロードした写真が回転してしまう問題に対応
  def fix_rotate
      manipulate! do |img|
          img = img.auto_orient
          img = yield(img) if block_given?
          img
      end
  end

end
