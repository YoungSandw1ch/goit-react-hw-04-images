import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  BtnIcon,
  Input,
  Logo,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { toastOptions } from 'constants/toestOptions';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [isWrap, setIsWrap] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.text.value.trim();
    if (!query) {
      toast.warn('Write something to search', toastOptions);
      onSubmit(query);
      setIsWrap(true);
      return;
    }
    onSubmit(query);
    setIsWrap(false);
    e.target.reset();
  };

  return (
    <Header isWrap={isWrap}>
      <Logo isWrap={isWrap}>Finder</Logo>

      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" aria-label="search">
          <BtnIcon />
        </SearchFormButton>

        <Input
          name="text"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
