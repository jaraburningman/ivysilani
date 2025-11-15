import React, { useState } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ImageGalleryDialog, type ImageGalleryDialogProps } from './ct_mini';

interface FormData {
  imageUrl: string;
}

const defaultValues: FormData = {
  imageUrl: '',
};

const meta: Meta<ImageGalleryDialogProps<FormData>> = {
  title: 'Components/ImageGalleryDialog',
  component: ImageGalleryDialog,
  decorators: [
    (Story) => {
      const { control } = useForm<FormData>({ defaultValues });

      return (
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => <Story {...field} />}
        />
      );
    },
  ],
};

const sportImages = [
  'basketbal.jpg',
  'fotbal.jpg',
  'curling.jpg',
  'atletika.jpg',
  'baseball.jpg',
  'box_a_bojove_sporty.jpeg',
  'dostihy.jpg',
  'florbal.jpg',
  'fotbal_2.jpeg',
  'futsal.jpg',
  'golf_2.jpg',
  'golf.jpeg',
  'hokej.jpg',
  'jezdectvi.jpg',
  'plavani.jpeg',
  'ragby.jpg',
  'silnicni_cyklistika.jpg',
  'sportovni_lezeni.jpg',
  'tenis.jpeg',
];

export default meta;

const Template: StoryFn<ImageGalleryDialogProps<FormData>> = (args) => {
  const [selectedImage, setSelectedImage] = useState<string>(args.field.value);
  const [showGalleryDialog, setShowGalleryDialog] = useState<boolean>(false);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    args.field.onChange(image);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ImageGalleryDialog
          {...args}
          field={{
            ...args.field,
            value: selectedImage,
          }}
          images={sportImages}
          showGalleryDialog={showGalleryDialog}
          onClose={() => setShowGalleryDialog(false)}
          onSave={handleImageSelect}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => {
            setShowGalleryDialog(true);
          }}
        >
          Zobrazit komponentu galerie
        </Button>
      </Grid>
    </Grid>
  );
};

export const Default: StoryObj<ImageGalleryDialogProps<FormData>> = Template.bind({});

Default.args = {
  alt: 'Ukázkový obrázek',
  field: {
    name: 'imageUrl',
    value: '',
    onChange: () => {},
    onBlur: () => {},
    ref: () => {},
  },
};
