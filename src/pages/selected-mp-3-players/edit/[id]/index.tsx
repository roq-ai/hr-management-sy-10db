import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSelectedMp3PlayersById, updateSelectedMp3PlayersById } from 'apiSdk/selected-mp-3-players';
import { selectedMp3PlayersValidationSchema } from 'validationSchema/selected-mp-3-players';
import { SelectedMp3PlayersInterface } from 'interfaces/selected-mp-3-players';
import { UserInterface } from 'interfaces/user';
import { Mp3PlayerInterface } from 'interfaces/mp-3-player';
import { getUsers } from 'apiSdk/users';
import { getMp3Players } from 'apiSdk/mp-3-players';

function SelectedMp3PlayersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SelectedMp3PlayersInterface>(
    () => (id ? `/selected-mp-3-players/${id}` : null),
    () => getSelectedMp3PlayersById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SelectedMp3PlayersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSelectedMp3PlayersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/selected-mp-3-players');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SelectedMp3PlayersInterface>({
    initialValues: data,
    validationSchema: selectedMp3PlayersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Selected Mp 3 Players',
              link: '/selected-mp-3-players',
            },
            {
              label: 'Update Selected Mp 3 Players',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Selected Mp 3 Players
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<Mp3PlayerInterface>
            formik={formik}
            name={'mp3_player_id'}
            label={'Select Mp 3 Player'}
            placeholder={'Select Mp 3 Player'}
            fetcher={getMp3Players}
            labelField={'brand'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/selected-mp-3-players')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'selected_mp3_players',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SelectedMp3PlayersEditPage);
