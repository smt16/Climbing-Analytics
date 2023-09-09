'use client'
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';

export default function Home() {
  const authToken = useCookies().get('authToken');
  const router = useRouter();
  let path = '';

  if (authToken) {
    path = '/dashboard' 
  } else {
    path = '/login'
  }

  router.push(path);

  return (
    <div></div>
  )
}
