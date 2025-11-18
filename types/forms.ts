/**
 * TypeScript interfaces para formularios
 */

export interface ContactForm {
  name: string
  lastname: string
  email: string
  phone?: string
  message: string
}

export interface DemoBookingForm {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  type?: 'solutions' | 'services' | 'consultancies'
  item?: string  // slug del item
  message?: string
}

export interface JobApplicationForm {
  firstName: string
  lastName: string
  email: string
  phone?: string
  position: string
  cv: string  // Directus file ID
  coverLetter?: string
}

export interface NewsletterForm {
  email: string
}
