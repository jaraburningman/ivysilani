// ct_mini_cr
// úkolem je projít soubor a okomentovat potenciálně problematická místa a navrhnout řešení - jako při code review
// ct_mini_cr_story.tsx je přiložen hlavně pro kontext, v něm není třeba problematická místa přímo hledat
// have fun!

// Jara: React is declared but its value is never read.
import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// Jara: declaration of import of a type
import { type ControllerRenderProps, type FieldPath, type FieldValues } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import ImageIcon from '@mui/icons-material/Image';
// import { getPublicConfig } from '@muf/config';

export type ImageGalleryDialogProps<TFieldValues extends FieldValues> = {
  alt?: string;
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  images: string[];
  onClose: () => void;
  onSave?: (image: string) => void;
  showGalleryDialog: boolean;
};

// Jara: missing slash in the path
// const imageStoreLocation = '/images/extra_streams';
const imageStoreLocation = 'images/extra_streams/';

// Jara: fix to make it work with storybook
// const { BASE_URL_STATIC } = getPublicConfig();
// const BASE_URL_STATIC  = 'http://localhost:6006';
const BASE_URL_STATIC  = './';

interface ImageProps {
  src: string;
}

/**
 * Univerzalni komponenta zobrazující galerii obrázků.
 */
export const ImageGalleryDialog = <TFieldValues extends FieldValues>({
                                                                       field: { onChange, value },
                                                                       onClose,
                                                                       onSave,
                                                                       showGalleryDialog,
                                                                       alt,
                                                                       images,
                                                                     }: ImageGalleryDialogProps<TFieldValues>) => {
  const [selectedImage, setSelectedImage] = useState<string>(value);

  const Image = styled('img')<{
    selectedImage: string;
    src: string;
  }>`
    border: ${({ src, selectedImage, theme }) =>
    selectedImage === src ? `4px solid ${theme.palette.primary.dark}` : '4px solid transparent'};
    cursor: pointer;
  `;

  const imagesArr: ImageProps[] = [];
  for (let i = 0; i < images.length; i++) {
    const name = images[i];
    imagesArr.push({
      src: BASE_URL_STATIC + imageStoreLocation + name,
    });
  }

  return (
    <>
      {value ? (
        <img alt={alt} className="MuiImageListItem-img" src={value} width="313" />
      ) : (
        <div>
          <Box
            sx={{
              width: 313,
              height: 176,
              borderRadius: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'grey.300',
            }}
          >
            <ImageIcon sx={{ fontSize: '3rem', opacity: 0.2 }} />
          </Box>
        </div>
      )}
      <Dialog
        PaperProps={{
          sx: {
            maxWidth: '960px',
          },
        }}
        open={showGalleryDialog}
        sx={{
          p: 0,
        }}
        onClose={onClose}
      >
        <DialogTitle sx={{ pb: 0 }}>Vybrat obrázek z knihovny</DialogTitle>
        <DialogContent>
          <ImageList cols={4}>
            {imagesArr.map((item: any) => (
              <ImageListItem
                key={item.src}
                onClick={() => {
                  console.log('item.src', item.src);
                  setSelectedImage(item.src);
                }}
              >
                <Image
                  alt=""
                  className="MuiImageListItem-img"
                  selectedImage={selectedImage}
                  src={item.src}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <>
            <Button
              variant="contained"
              onClick={() => {
                onChange(onSave ? onSave(selectedImage) : selectedImage);
                onClose();
              }}
            >
              Použít
            </Button>
          </>
          <Button autoFocus onClick={onClose}>
            Zrušít
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
