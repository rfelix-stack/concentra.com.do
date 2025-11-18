import { z } from 'zod'

/**
 * Schemas de validación Zod para formularios
 * Previenen inyecciones y validan datos del usuario
 */

// Mensajes de error en español
const errorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: 'Tipo de dato inválido' }
    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') {
        return { message: `Mínimo ${issue.minimum} caracteres` }
      }
      return { message: 'Valor muy pequeño' }
    case z.ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return { message: `Máximo ${issue.maximum} caracteres` }
      }
      return { message: 'Valor muy grande' }
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'Email inválido' }
      }
      return { message: 'Formato inválido' }
    default:
      return { message: ctx.defaultError }
  }
}

z.setErrorMap(errorMap)

// Validadores reutilizables
const nameValidator = z.string()
  .min(2, 'Mínimo 2 caracteres')
  .max(100, 'Máximo 100 caracteres')
  .trim()
  .refine((val) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(val), {
    message: 'Solo letras, espacios, guiones y apóstrofes'
  })

const emailValidator = z.string()
  .email('Email inválido')
  .toLowerCase()
  .trim()

const phoneValidator = z.string()
  .regex(/^\+?[0-9\s\-()]+$/, 'Teléfono inválido (solo números, espacios, +, -, paréntesis)')
  .min(7, 'Mínimo 7 dígitos')
  .max(20, 'Máximo 20 caracteres')
  .optional()
  .or(z.literal(''))

const messageValidator = z.string()
  .min(10, 'Mínimo 10 caracteres')
  .max(2000, 'Máximo 2000 caracteres')
  .trim()

// Schema para formulario de contacto
export const contactSchema = z.object({
  name: nameValidator,
  lastname: nameValidator,
  email: emailValidator,
  phone: phoneValidator,
  message: messageValidator
})

// Schema para solicitud de demo
export const demoBookingSchema = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  email: emailValidator,
  phone: phoneValidator,
  company: z.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(200, 'Máximo 200 caracteres')
    .trim()
    .optional()
    .or(z.literal('')),
  type: z.enum(['solutions', 'services', 'consultancies']).optional(),
  item: z.string().optional(),
  message: z.string()
    .max(1000, 'Máximo 1000 caracteres')
    .trim()
    .optional()
    .or(z.literal(''))
})

// Schema para solicitud de empleo
export const jobApplicationSchema = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  email: emailValidator,
  phone: phoneValidator,
  position: z.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(200, 'Máximo 200 caracteres')
    .trim(),
  cv: z.string()
    .min(1, 'CV requerido')
    .uuid('ID de archivo inválido'),
  coverLetter: z.string()
    .max(2000, 'Máximo 2000 caracteres')
    .trim()
    .optional()
    .or(z.literal(''))
})

// Schema para newsletter
export const newsletterSchema = z.object({
  email: emailValidator
})

// Tipos TypeScript inferidos de los schemas
export type ContactFormData = z.infer<typeof contactSchema>
export type DemoBookingFormData = z.infer<typeof demoBookingSchema>
export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
