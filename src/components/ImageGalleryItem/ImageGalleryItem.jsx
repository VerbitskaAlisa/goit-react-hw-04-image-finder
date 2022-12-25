import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({url, tags, largeImg, onSelect}) => {
    return (
        <>
        <img src={url} alt={tags} className={css.ImageGalleryItemImage} 
        onClick={() => {onSelect(largeImg, tags)}}/>
        </>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };