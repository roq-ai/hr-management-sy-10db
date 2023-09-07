import * as yup from 'yup';

export const songValidationSchema = yup.object().shape({
  title: yup.string().required(),
  artist: yup.string().required(),
  duration: yup.number().integer().required(),
  genre: yup.string().required(),
  release_date: yup.date().required(),
});
