import PropTypes from 'prop-types';
import {
  ImageGalleryItemList,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  alt,
  onClickImage,
}) {
  return (
    <ImageGalleryItemList>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={alt}
        onClick={() => onClickImage(largeImageURL)}
      />
    </ImageGalleryItemList>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
