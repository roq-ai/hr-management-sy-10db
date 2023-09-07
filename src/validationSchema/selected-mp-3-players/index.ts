import * as yup from 'yup';

export const selectedMp3PlayersValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  mp3_player_id: yup.string().nullable().required(),
});
