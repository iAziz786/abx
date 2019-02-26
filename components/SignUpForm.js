import React from 'react';
import { TextField as Text, FormGroup, Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextField = styled(Text)`
  margin-bottom: 15px !important;
`;

function SignUpForm() {
  return (
    <StyledForm method={'post'} action={'/signup'}>
      {/* <FormControl> */}
      <FormGroup>
        <TextField
          label={'Sponsor ID'}
          name={'sponsor_id'}
          variant={'outlined'}
        />
        <TextField
          label={'Password'}
          type={'password'}
          name={'password'}
          variant={'outlined'}
        />
        <TextField label={'Name'} name={'name'} variant={'outlined'} />
        <TextField label={'Phone'} name={'phone'} variant={'outlined'} />
        <Button type={'submit'} color={'primary'} variant={'contained'}>
          Submit
        </Button>
      </FormGroup>
    </StyledForm>
  );
}

export default SignUpForm;
