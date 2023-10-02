import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId:'nrev6ch1',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, 
});
