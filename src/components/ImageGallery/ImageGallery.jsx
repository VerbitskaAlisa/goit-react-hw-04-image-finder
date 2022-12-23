import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({images, onSelect}) => {
   return (
    <ul className={css.ImageGallery}>
        {images.map(({id, webformatURL, tags, largeImageURL}) => {
        return (<li key={id} className={css.ImageGalleryItem}>
            <ImageGalleryItem onSelect={onSelect}
                              url={webformatURL} 
                              tags={tags}
                              largeImg={largeImageURL}/>
        </li>
        )
    })}</ul>
   )
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
}