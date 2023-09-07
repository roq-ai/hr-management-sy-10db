import * as yup from 'yup';

export const favoriteSongsValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  song_id: yup.string().nullable().required(),
});
