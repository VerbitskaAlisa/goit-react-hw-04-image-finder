import { useEffect, memo } from "react";
import css from './Modal.module.css';


function ModalWindow ({selectImage, resetImage}) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown)

        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    })

    const handleKeydown = e => {
        if(e.code === 'Escape') {
            resetImage();
        }
    }

    const handleBackdropClick = e => {
        if(e.currentTarget === e.target) {
            resetImage();
        }
    }
    
    const {url, tags} = selectImage;
    return <div className={css.Overlay} onClick={handleBackdropClick}>
    <div className={css.Modal}>
    <img src={url} alt={tags} />
    </div>
    </div>
}

export default memo(ModalWindow);

//////MODAl on CLass

// export default class ModalWindow extends PureComponent {
//     componentDidMount () {
//         window.addEventListener('keydown', this.handleKeydown)
//     }

//     componentWillUnmount () {
//         window.removeEventListener('keydown', this.handleKeydown)
//     }

//     handleKeydown = e => {
//         if(e.code === 'Escape') {
//             this.props.resetImage();
//         }
//     }

//     handleBackdropClick = e => {
//         if(e.currentTarget === e.target) {
//             this.props.resetImage();
//         }
//     }

//     render () {
//         const {url, tags} = this.props.selectImage;
//         return (
//             <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div className={css.Modal}>
//         <img src={url} alt={tags} />
//         </div>
//         </div>

//         )
//     }
// }

// MOdal from React-Modal but without working close by click on backdrope

// import Modal from 'react-modal';
// import PropTypes from 'prop-types';

// const modalStyles = {
//   overlay: {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     width: '100vw',
//     height: '100vh',
//     display: 'flex',
//     justifyContent: ' center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     zIndex: '1200',
//   },
//   content: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxWidth: 'calc(100vw - 48px)',
//     maxHeight: 'calc(100vh - 24px)',
//     padding: '0',
//     backgroundColor: 'transparent',
//     border: 'none',
//     outline: 'none',
//     overflow: 'hidden',
//   },
// };
// Modal.setAppElement('#root');

// export const ModalWindow = ({ selectImage, resetImage }) => {
//   return (
//     <Modal
//       isOpen={Boolean(selectImage)}
//       onRequestClose={resetImage}
//       style={modalStyles}
//     >
//       <img src={selectImage} alt="Large" />
//     </Modal>
//   );
// };

// Modal.propTypes = {
//   selectImage: PropTypes.string,
//   resetImage: PropTypes.func,
// };