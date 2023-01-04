import Searchbar from "./Searchbar/Searchbar";
import css from './App.module.css';
import ModalWindow from "./Modal/Modal";
import { Audio } from  'react-loader-spinner';
import ImageGallery from "./ImageGallery/ImageGallery";
import imagesApi from "./Api";
import Button from "./Button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";


export default function App () {
  const [page, setPage] = useState(1);
  const[query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(query === '') {
      return;
    }

    async function search() {
      try{
        setIsLoading(true);
       
       await imagesApi
         .fetchImages(query, page)
         .then(({ hits }) => {
          setItems(prevState => [...prevState, ...hits])
          setIsLoading(false);
         })
      }
       catch (error) {
               toast.error('Oops!Something went wrong!');
          }
  }
  search();
 }, [page, query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
  }

  const onClick = () => {
    setPage(prevState => prevState + 1);
  }

  const selectImage = (imgUrl, tags) => {
    setSelectedImage({url: imgUrl, tags});
    setShowModal(true);
  };
  
  const resetImage = () => {
    setSelectedImage(null);
    setShowModal(false);
  };
  return <div className={css.App}>
  <Searchbar onSubmit={handleFormSubmit}/>
  {items.length > 0 && <ImageGallery images={items} onSelect={selectImage}/>}
  {items.length > 11 && !isLoading && (<Button onClick={onClick}/>)}
  {isLoading && <Audio color="blue"/>}
  {showModal && <ModalWindow selectImage={selectedImage} resetImage={resetImage}/>}
  <ToastContainer />
</div>
}

// export default class App extends Component {
//   state={
//     page: 1,
//     query: '',
//     items: [],
//     selectedImage: false,
//     showModal: false,
//   }
  
//   handleFormSubmit = query => {
//     this.setState({
//       query,
//       page: 1,
//       items: [],
//     })
//   }

//   async componentDidUpdate (_, prevState) {
//     try {
//       const { query, page } = this.state;

//       if (prevState.page !== page || prevState.query !== query) {  
//         this.setState({isLoading: true});

//         await imagesApi
//          .fetchImages(query, page)
//          .then(({ hits }) => {
//           this.setState(prevState =>({
//             items: [...prevState.items, ...hits],
//             isLoading: false, 
//           })
//           )
//          })
//     }
//     } catch (error) {
//         toast.error('Oops!Something went wrong!');
//     }
//   }

//   onClick = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   }

//   selectImage = (imgUrl, tags) => {
//     this.setState({
//       selectedImage: {
//         url: imgUrl,
//         tags,
//       },
//       showModal: true,
//     })
//   };

//   resetImage = () => {
//     this.setState({
//       selectedImage: null,
//       showModal: false,
//     });
//   };

//   render () {
//     const { items, isLoading, selectedImage, showModal } = this.state;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={this.handleFormSubmit}/>
//         {items.length > 0 && <ImageGallery images={items} onSelect={this.selectImage}/>}
//         {items.length > 11 && !isLoading && (<Button onClick={this.onClick}/>)}
//         {isLoading && <Audio color="blue"/>}
//         {showModal && <ModalWindow selectImage={selectedImage} resetImage={this.resetImage}/>}
//         <ToastContainer />
//       </div>
//     );
//   }
// };
