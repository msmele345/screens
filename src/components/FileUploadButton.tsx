import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUploadButton = () => {
  return (
    <Button
      component="label"
    //   type='submit'
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
     sx={{
        fontSize: '1.25rem',
        fontFamily: 'Quicksand, sans-serif',
        color: 'whitesmoke',
        fontWeight: '600',
        colorAdjust: 'rgb(113, 25, 176'
     }}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
};

export default FileUploadButton;
