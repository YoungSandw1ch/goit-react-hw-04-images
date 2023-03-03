import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'components/Common/GlobalStyle';
import { theme } from 'constants/thema';
import { Box } from './Common/Box';
import { Searchbar } from './Searchbar';
import { useState, useEffect } from 'react';
import { getImages } from 'services';
import { toast, ToastContainer } from 'react-toastify';
import { toastOptions } from 'constants/toestOptions';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function foo() {
      try {
        if (!query) return;
        setIsLoading(true);
        const data = await getImages(query, page);
        const hits = data.hits;

        if (!hits.length) {
          toast.error('Ups, nothing to search', toastOptions);
        }

        setHits(pHits => [...pHits, ...hits]);
        setIsLoading(false);
        setTotalHits(data.totalHits);
      } catch (error) {
        // setError(error);
        console.log(error.message);
      }
    }
    foo();
  }, [page, query]);

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const formSubmit = value => {
    if (value === query) return;
    setQuery(value);
    setPage(1);
    setHits([]);
    // setError(null);
    setTotalHits(0);
  };

  const hasMore = totalHits === hits.length && page > 1 ? false : true;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Searchbar onSubmit={formSubmit} />
        <ImageGallery
          hits={hits}
          setPage={nextPage}
          openModal={setModalImage}
          isLoading={isLoading}
          hasMore={hasMore}
        />
        <Modal closeModal={() => setModalImage(null)} image={modalImage} />
      </Box>
      <ToastContainer />
      <GlobalStyle />
    </ThemeProvider>
  );
};
