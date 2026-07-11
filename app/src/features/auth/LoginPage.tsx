import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { AuthLayout } from './AuthLayout'
import { FormField } from './FormField'
import { useSession } from './session'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useSession((s) => s.login)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async (values) => {
    await login(values.email, values.password)
    await navigate({ to: '/app/$view', params: { view: 'today' } })
  })

  return (
    <AuthLayout>
      <h1 className="text-[22px] font-semibold tracking-tight text-ink">{t('auth.loginTitle')}</h1>
      <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <FormField
          id="email"
          type="email"
          autoComplete="email"
          label={t('auth.email')}
          error={errors.email ? t('auth.emailInvalid') : undefined}
          {...register('email')}
        />
        <FormField
          id="password"
          type="password"
          autoComplete="current-password"
          label={t('auth.password')}
          error={errors.password ? t('auth.passwordMin') : undefined}
          {...register('password')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-lg bg-cobalt text-[15px] font-medium text-white transition-transform active:translate-y-px disabled:opacity-60"
        >
          {t('auth.loginAction')}
        </button>
      </form>
      <p className="mt-6 text-sm text-graphite">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="font-medium text-cobalt hover:underline">
          {t('auth.registerTitle')}
        </Link>
      </p>
    </AuthLayout>
  )
}
