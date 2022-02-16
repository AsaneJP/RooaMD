import { useState } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Typography, Container, Box, Grid, CssBaseline, Button, FormHelperText, FormControl } from '@mui/material'
import { InputText } from '../atom/InputText'
import { InputCheckBox } from '../atom/InputCheckBox'

type FormData = {
  username: string
  email: string
  password: string
  repassword: string
  permiss: boolean
}

const schema = yup.object().shape({
  username: yup.string().required('ユーザー名は必須です'),
  email: yup.string().email('メールアドレスを入力してください').required('メールアドレスは必須です'),
  password: yup
    .string()
    .required('パスワードは必須です')
    .min(8, 'パスワードは8文字以上で入力してください')
    .max(32, 'パスワードは32文字以内で入力してください')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      'パスワードは小文字・大文字・数字・特殊文字を含めて入力してください'
    ),
  repassword: yup
    .string()
    .required('パスワードを再度入力してください')
    .min(8, 'パスワードは8文字以上で入力してください')
    .max(32, 'パスワードは32文字以内で入力してください')
    .oneOf([yup.ref('password'), null], 'パスワードが一致しません')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].*$/,
      'パスワードは小文字・大文字・数字・特殊文字を含めて入力してください'
    ),
  permiss: yup.boolean().oneOf([true], '利用規約に同意してください').required('利用規約に同意してください'),
})

export const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (inData: FormData) => {
    axios
      .post(`${process.env.REACT_APP_API_URL || 'local'}/auth/signup`, {
        username: inData.username,
        email: inData.email,
        password: inData.password,
        status: 'FREE',
      })
      .then((res) => {
        // console.log(res.status)
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        if (error.response!.status === 500) {
          setErrorMsg('既に登録されているメールアドレスです')
        } else {
          setErrorMsg('予期せぬエラーが発生しました')
        }
      })
    reset({ password: '', repassword: '' })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mt: 1, width: '100%' }}>
          {errorMsg !== '' && (
            <FormControl error>
              <FormHelperText>{errorMsg}</FormHelperText>
            </FormControl>
          )}
          <InputText
            id="username"
            label="Username"
            required
            error={'username' in errors}
            helperText={errors.username?.message}
            register={register('username')}
            type="text"
          />
          <InputText
            id="email"
            label="Email"
            type="email"
            required
            error={'email' in errors}
            helperText={errors.email?.message}
            register={register('email')}
          />
          <InputText
            id="password"
            label="Password"
            type="password"
            required
            error={'password' in errors}
            helperText={errors.password?.message}
            register={register('password')}
          />
          <InputText
            id="repassword"
            label="Re-Password"
            type="password"
            required
            error={'repassword' in errors}
            helperText={errors.repassword?.message}
            register={register('repassword')}
          />
          <InputCheckBox
            id="permiss"
            name="permiss"
            label="利用規約に同意します"
            error={'permiss' in errors}
            helperText={errors.permiss?.message}
            register={register('permiss')}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit(onSubmit)}>
            新規登録
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>
                <Link underline="always" href="/signin">
                  ログイン
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
