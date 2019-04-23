class YourImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  process :fix_exif_rotation

  snip...

end