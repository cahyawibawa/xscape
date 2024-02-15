import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { AppLogo } from '~/components/app-logo';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { getSupabaseWithSessionAndHeaders } from '~/lib/supabase.server';
import { ThemeToggle } from './resources.theme-toggle';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  if (serverSession) {
    return redirect('/home', { headers });
  }

  return json({ success: true }, { headers });
};

export default function Index() {
  return (
    <section className='w-full min-h-screen flex flex-col'>
      <nav className='w-full flex items-center justify-between p-4'>
        <AppLogo className='size-8 ' />
        <h1 className='text-xl font-semibold text-foreground'>xscape</h1>
        <ThemeToggle />
      </nav>
      <div className='container md:flex justify-center items-center px-4 md:px-6 flex-1'>
        <div className='flex flex-col items-center space-y-4 text-center p-4 md:w-1/2'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tighter'>
            A{' '}
            <span className='font-extrabold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient'>
              Minimalist Social Platform,
            </span>{' '}
            Connect with like-minded individuals using only Github sign-in
          </h1>

          <p className='text-gray-500 mt-2'>
            Built by <span className='text-blue-700 font-bold mt-2'>Remix</span>{' '}
            and <span className='text-green-700 font-bold mt-2'>Supabase</span>
          </p>

          <Button asChild>
            <Link to='/signin'>Join our Community</Link>
          </Button>
        </div>
        <Card className='relative group overflow-hidden rounded-lg md:w-1/2'>
          <CardContent className='p-1'>
            <img
              className='h-full w-full rounded-lg'
              alt='xscape'
              height={100}
              width={100}
              src='assets/images/xscape.png'
            ></img>
            {/* <video className='h-full w-full rounded-lg' autoPlay loop muted>
              <source src='assets/video/demo.mp4' type='video/mp4'></source>
            </video> */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
