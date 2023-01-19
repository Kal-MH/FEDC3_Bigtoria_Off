import { HighlightOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';

import useSearchForm from '../../hooks/useSearchForm';

interface Props {
  onSubmit: (keyword: string) => void;
}

const SearchForm = ({ onSubmit }: Props) => {
  const {
    value,
    error,
    handleInputChange,
    handleInputClear,
    handleFormSubmit,
  } = useSearchForm({ onSubmit });

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 4,
        padding: '1rem',
      }}>
      <Box
        component='form'
        sx={{
          width: '100%',
          position: 'relative',
          marginBottom: '10px',
        }}
        onSubmit={handleFormSubmit}>
        <TextField
          sx={{
            width: '100%',
            '& input': {
              height: '50px',
              paddingLeft: '11px',
            },
          }}
          variant='standard'
          type='text'
          label='닉네임'
          color='warning'
          value={value}
          error={error.keyword !== ''}
          helperText={error.keyword}
          onChange={handleInputChange}
        />
        {value && (
          <IconButton
            color='primary'
            component='label'
            sx={{
              position: 'absolute',
              right: '2px',
              top: '30px',
              color: '#00000099',
            }}
            onClick={handleInputClear}>
            <HighlightOff />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default SearchForm;
