import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";

export default function MagicLogin() {
  const router = useRouter();

  const verifyMagicLink = useCallback(async (token: string) => {
    try {
      const res = await fetch(`http://localhost:8080/auth/verify?token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (err) {
      console.error(err);
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      verifyMagicLink(token);
    }
  }, [router.query.token, verifyMagicLink]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Logging you in... ✨</h2>
      <p>Hang tight, we’re verifying your link.</p>
    </div>
  );
}
