import { API_REVALIDATE } from "./env"

export const apiConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    revalidate: parseInt(API_REVALIDATE, 10),
  }
}
