import Searchbar from './components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import './App.css';
import 'react-loader-spinner';
import searchImages from './services/api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    searchImages(searchQuery, page)
      .then(images => {
        if (!images.hits.length) {
          alert('Image not found');
          setStatus('rejected');
          return;
        } else {
          const data = images.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );

          setImages(state => [...state, ...data]);
          setStatus('resolved');
          setLoadMore(true);
        }
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setStatus('rejected'));
  }, [page, searchQuery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setStatus('idle');
  };

  const onClickButton = () => {
    setPage(page => page + 1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onClickImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'pending' && (
        <>
          <ImageGallery images={images} onClickImage={onClickImage} />
          <Loader />
        </>
      )}
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} onClickImage={onClickImage} />
          {loadMore && <Button loadMore={onClickButton} />}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
}
