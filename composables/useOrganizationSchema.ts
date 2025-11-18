/**
 * Composable para agregar Schema.org Organization structured data
 * Mejora el SEO y permite a Google mostrar información rica en los resultados de búsqueda
 *
 * @see https://schema.org/Organization
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export function useOrganizationSchema() {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://concentra.com.do'

  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'ConCentra',
          'legalName': 'ConCentra - Consultoría Tecnológica',
          'url': siteUrl,
          'logo': `${siteUrl}/favicons/android-icon-192x192.png`,
          'description': 'Consultoría tecnológica especializada en la mejora de procesos empresariales mediante TIC, consultoría ITIL, soluciones de software empresarial, outsourcing TI y ciberseguridad.',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'DO',
            'addressLocality': 'Santo Domingo',
            'addressRegion': 'Distrito Nacional'
          },
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'customer service',
            'availableLanguage': ['es', 'en']
          },
          'sameAs': [
            // Agregar redes sociales reales de ConCentra
            // 'https://www.facebook.com/concentra',
            // 'https://www.linkedin.com/company/concentra',
            // 'https://twitter.com/ConCentraRD'
          ]
        })
      }
    ]
  })
}
