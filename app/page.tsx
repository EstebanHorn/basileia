import MateoApp from '@/components/mateo/MateoApp';
import { AuthProvider } from '@/lib/supabase/auth-context';

export default function Home() {
  return (
    <AuthProvider>
      <MateoApp />
    </AuthProvider>
  );
}
