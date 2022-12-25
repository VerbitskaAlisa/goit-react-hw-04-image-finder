import Searchbar from "./Searchbar/Searchbar";
import css from './App.module.css';
import ModalWindow from "./Modal/Modal";
import { Component } from "react";
import { Audio } from  'react-loader-spinner';
import ImageGallery from "./ImageGallery/ImageGallery";
import imagesApi from "./Api";
import Button from "./Button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default class App extends Component {
  state={
    page: 1,
    query: '',
    items: [],
    selectedImage: false,
    showModal: false,
  }
  
  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
      items: [],
    })
  }

  async componentDidUpdate (_, prevState) {
    try {
      const { query, page } = this.state;

      if (prevState.page !== page || prevState.query !== query) {  
        this.setState({isLoading: true});

        await imagesApi
         .fetchImages(query, page)
         .then(({ hits }) => {
          console.log(hits)
          this.setState(prevState =>({
            items: [...prevState.items, ...hits],
            isLoading: false, 
          })
          )
         })
    }
    } catch (error) {
        toast.error('Oops!Something went wrong!');
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  selectImage = (imgUrl, tags) => {
    this.setState({
      selectedImage: {
        url: imgUrl,
        tags,
      },
      showModal: true,
    })
  };

  resetImage = () => {
    this.setState({
      selectedImage: null,
      showModal: false,
    });
  };

  render () {
    const { items, isLoading, selectedImage, showModal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {items.length > 0 && <ImageGallery images={items} onSelect={this.selectImage}/>}
        {items.length > 11 && !isLoading && (<Button onClick={this.onClick}/>)}
        {isLoading && <Audio color="blue"/>}
        {showModal && <ModalWindow selectImage={selectedImage} resetImage={this.resetImage}/>}
        <ToastContainer />
      </div>
    );
  }
};
