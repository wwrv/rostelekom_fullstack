import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rostelecom Application',
    short_name: 'Rostelecom App',
    description:
      'Rostelecom магазин одежды, аксесуаров, концелярии и сувениров',
    start_url: '/',
  }
}