import { Component } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';


export default class Searchbar extends Component {
    static defaultProps = {
        onSubmit: PropTypes.func.isRequired,
    }


    state={
        imageName: "",
    }

    handleSubmit = (e) => {
       e.preventDefault();

       if(this.state.imageName.trim() === '' ) {
        return;
       }
       this.props.onSubmit(this.state.imageName)
       this.setState({imageName: ''})
    }

    handleInputChange = (e) => {
        const value = e.currentTarget.value.toLowerCase();
        this.setState({imageName: value})
    }
    
    render () {
        const { imageName } = this.state;
        const { handleSubmit, handleInputChange } = this;

        return (
            <header className={css.Searchbar}>
                  <form className={css.SearchForm} onSubmit={handleSubmit}>
                  <button type="submit" className={css.SearchFormButton}>
                  <span className={css.SearchFormButtonLabel}>Search</span>
                   </button>

                <input
                   className={css.SearchFormInput}
                   type="text"
                   autoComplete="off"
                   autoFocus
                   value={imageName}
                   onChange={handleInputChange}
                   placeholder="Search images and photos"
                 />
             </form>
            </header>
        )
    }
}