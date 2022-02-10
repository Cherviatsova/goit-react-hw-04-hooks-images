import React from 'react';
import { Loading } from './Loader.styled';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Loading>
      Loading
      <Audio heigth="100" width="100" color="grey" ariaLabel="loading" />
    </Loading>
  );
};

export default Loader;
