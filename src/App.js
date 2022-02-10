import Searchbar from './components/Searchbar/Searchbar';
import React, { Component } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import './App.css';
import 'react-loader-spinner';
import searchImages from './services/api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const { page } = this.state;

    if (prevQuery !== nextQuery) {
      this.setState({ images: [], page: 1, status: 'pending' });
      this.getLoadImg(nextQuery, page);
    }
    if (prevState.page !== page && page !== 1) {
      this.getLoadImg(nextQuery, page);
    }
  }

  getLoadImg = (searchQuery, pageNumber) => {
    searchImages(searchQuery, pageNumber)
      .then(images => {
        if (!images.hits.length) {
          alert('Image not found');
          this.setState({
            error: 'Error. Try again',
            status: 'rejected',
          });
        } else {
          const data = images.hits.map(
            ({ id, webformatURL, largeImageURL }) => {
              return {
                id,
                webformatURL,
                largeImageURL,
              };
            }
          );
          this.setState(prevState => ({
            images: [...prevState.images, ...data],
            status: 'resolved',
            loadMore: true,
          }));
        }
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        })
      );
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onClickButton = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };

  render() {
    const { images, status, loadMore, largeImageURL, showModal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && (
          <>
            <ImageGallery images={images} onClickImage={this.onClickImage} />
            <Loader />
          </>
        )}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onClickImage={this.onClickImage} />
            {loadMore && <Button loadMore={this.onClickButton} />}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
