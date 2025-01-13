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

interface FileUploadButtonProps {
  onChangeHandler: (e: any) => void;
}

const FileUploadButton = ({ onChangeHandler }: FileUploadButtonProps) => {
  return (
    <Button
      component="label"
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
        onChange={(event) => onChangeHandler(event)}
        multiple
      />
    </Button>
  );
};

export default FileUploadButton;
