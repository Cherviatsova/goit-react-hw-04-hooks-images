import React from 'react';
import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export default function Button({ loadMore }) {
  return (
    <LoadMoreButton type="button" onClick={loadMore}>
      Load more
    </LoadMoreButton>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
