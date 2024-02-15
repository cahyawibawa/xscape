import type { LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Link, Outlet } from '@remix-run/react';
import { AppLogo } from '~/components/app-logo';
import { UserNav } from '~/components/user-nav';
import { getSupabaseWithSessionAndHeaders } from '~/lib/supabase.server';
import { getUserDataFromSession } from '~/lib/utils';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  if (!serverSession) {
    return redirect('/signin', { headers });
  }

  const { userId, userAvatarUrl, username } =
    getUserDataFromSession(serverSession);

  return json(
    { userDetails: { userId, userAvatarUrl, username } },
    { headers }
  );
};

export default function Home() {
  return (
    <section className='mx-auto min-h-screen max-w-xl flex flex-col items-center'>
      <nav className='sticky backdrop-blur-[100px] top-0 z-50 flex w-full items-center justify-between p-4 flex-wrap md:flex-nowrap'>
        <Link to='/' className='flex items-center space-x-2'>
          <AppLogo className='size-8 md:h-8 md:w-8' />
          {/* <h1 className='text-xl font-semibold text-zinc-900 '></h1> */}
        </Link>
        <UserNav />
        {/* <Link to={`/profile/${username}`}>@{username}</Link>
          <img
            alt='Profile'
            className='rounded-full'
            height='40'
            src={userAvatarUrl}
            style={{
              aspectRatio: '40/40',
              objectFit: 'cover',
            }}
            width='40'
          />
          <Button onClick={handleSignOut}>Logout</Button> */}
      </nav>
      <Outlet />
    </section>
  );
}
