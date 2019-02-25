import React from 'react';
import { TextField, FormGroup, Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
      </FormGroup>
      <FormGroup>
        <TextField label={'Name'} name={'name'} variant={'outlined'} />
        <TextField label={'Phone'} name={'phone'} variant={'outlined'} />
      </FormGroup>
      <Button type={'submit'} color={'primary'} variant={'contained'}>
        Submit
      </Button>
    </StyledForm>
  );
}

export default SignUpForm;
