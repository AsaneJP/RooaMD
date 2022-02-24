import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Container, Typography, Box, Grid, CssBaseline, Button, FormControl, FormHelperText } from '@mui/material'
import { InputText } from '../atom/InputText'
import { InputCheckBox } from '../atom/InputCheckBox'

type FormData = {
  email: string
  password: string
  check: boolean
}

const schema = yup.object().shape({
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
  check: yup.boolean(),
})

export const SignIn = memo(() => {
  const [errorMsg, setErrorMsg] = useState('')
  const setCookie = useCookies(['accessToken'])[1]
  const navigate = useNavigate()
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
      .post(`${process.env.REACT_APP_API_URL || 'local'}/auth/signin`, {
        email: inData.email,
        password: inData.password,
      })
      .then((res: AxiosResponse<{ accessToken: string }>) => {
        setCookie('accessToken', res.data.accessToken)
        navigate('/')
      })
      .catch((error: AxiosError<{ additionalInfo: string }>) => {
        if (error.response!.status === 401) {
          setErrorMsg('メールアドレスが存在しないか、パスワードが間違っています')
        } else {
          setErrorMsg('予期せぬエラーが発生しました')
        }
      })
    reset({ password: '' })
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

          <InputCheckBox
            id="check"
            name="check"
            label="ログイン状態を保存する"
            error={'check' in errors}
            helperText={errors.check?.message}
            register={register('check')}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit(onSubmit)}>
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography>
                <Link underline="always" href="/signup">
                  パスワードをお忘れですか？
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link underline="always" href="/signup">
                  新規登録
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
})
