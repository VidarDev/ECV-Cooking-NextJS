export const apiConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    revalidate: parseInt(process.env.API_REVALIDATE || '0', 10),
  }
}
