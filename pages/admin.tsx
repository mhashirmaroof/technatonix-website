import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin-dashboard');
  }, [router]);

  return <div>Redirecting to admin dashboard...</div>;
};

export default AdminRedirect;