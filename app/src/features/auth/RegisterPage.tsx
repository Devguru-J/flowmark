import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { AuthLayout } from './AuthLayout'
import { FormField } from './FormField'
import { useSession } from './session'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

type RegisterValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const registerUser = useSession((s) => s.register)
  const [confirmSent, setConfirmSent] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = handleSubmit(async (values) => {
    let result: Awaited<ReturnType<typeof registerUser>>
    try {
      result = await registerUser(values.name, values.email, values.password)
    } catch {
      setError('root', { message: t('auth.registerFailed') })
      return
    }
    if (result === 'confirm_email') {
      setConfirmSent(true)
      return
    }
    await navigate({ to: '/app/$view', params: { view: 'today' } })
  })

  return (
    <AuthLayout>
      <h1 className="text-[22px] font-semibold tracking-tight text-ink">
        {t('auth.registerTitle')}
      </h1>
      <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <FormField
          id="name"
          type="text"
          autoComplete="name"
          label={t('auth.name')}
          error={errors.name ? t('auth.nameRequired') : undefined}
          {...register('name')}
        />
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
          autoComplete="new-password"
          label={t('auth.password')}
          error={errors.password ? t('auth.passwordMin') : undefined}
          {...register('password')}
        />
        {errors.root ? (
          <p role="alert" className="text-sm text-rust">
            {errors.root.message}
          </p>
        ) : null}
        {confirmSent ? (
          <p role="status" className="text-sm text-green-signal">
            {t('auth.confirmEmailSent')}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-lg bg-cobalt text-[15px] font-medium text-white transition-transform active:translate-y-px disabled:opacity-60"
        >
          {t('auth.registerAction')}
        </button>
      </form>
      <p className="mt-6 text-sm text-graphite">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-medium text-cobalt hover:underline">
          {t('auth.loginTitle')}
        </Link>
      </p>
    </AuthLayout>
  )
}
