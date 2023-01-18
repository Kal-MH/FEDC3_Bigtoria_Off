import { Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

import FontText from '../components/Home/FontText.js';
import SearchForm from '../components/Home/SearchForm.js';
import UserList from '../components/Home/UserList.js';
import useDebounce from '../hooks/useDebounce.js';
import useInfiniteScroll from '../hooks/useInfiniteScroll.js';

const Home = () => {
  const {
    setTarget,
    data,
    isLoaded,
    isAllRendered,
    initAllStateAndGetDataWithAPI,
    searchDataWithState,
  } = useInfiniteScroll();

  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (keyword: string) => {
    setKeyword(keyword);
  };

  useDebounce({
    fn: async () => {
      keyword === ''
        ? await initAllStateAndGetDataWithAPI()
        : await searchDataWithState(keyword);
    },
    ms: 300,
    deps: [keyword],
  });

  return (
    <Box
      sx={{
        minWidth: '320px',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
      }}>
      <FontText
        title='B.'
        sx={{
          display: 'inline-block',
          marginBottom: '30px',
          fontSize: '5rem',
        }}
      />
      <Box
        component='main'
        sx={{
          width: '92%',
          display: 'block',
          margin: '0 auto',
        }}>
        <SearchForm onSubmit={handleSubmit} />
        <Box>
          <FontText
            title='profiles..'
            sx={{
              display: 'inline-block',
              fontSize: '24px',
              paddingLeft: '5px',
              marginTop: '20px',
            }}
          />
          {data && <UserList users={data} />}
        </Box>
      </Box>
      {!isAllRendered && (
        <Box
          ref={setTarget}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '30px',
            padding: '40px',
          }}>
          {isLoaded && (
            <CircularProgress
              color='warning'
              size={48}
              sx={{
                position: 'absolute',
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
