import * as yup from 'yup';

export const mp3PlayerValidationSchema = yup.object().shape({
  brand: yup.string().required(),
  model: yup.string().required(),
  price: yup.number().integer().required(),
  color: yup.string().required(),
  weight: yup.number().integer().required(),
});
