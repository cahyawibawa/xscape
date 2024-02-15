import { cssBundleHref } from '@remix-run/css-bundle';
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {
  getSupabaseEnv,
  getSupabaseWithSessionAndHeaders,
} from './lib/supabase.server';
import { useSupabase } from './lib/supabase';
import { Toaster } from './components/ui/toaster';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {
  getHints,
  ClientHintCheck,
  useTheme,
  useNonce,
} from './lib/client-hints';
import { getTheme } from './lib/theme.server';
import clsx from 'clsx';
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import styles from './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });
  const domainUrl = process.env.DOMAIN_URL!;

  return json(
    {
      env: getSupabaseEnv(),
      serverSession,
      domainUrl,
      requestInfo: {
        hints: getHints(request),
        userPrefs: {
          theme: getTheme(request),
        },
      },
    },
    { headers }
  );
};

export default function App() {
  const { env, serverSession, domainUrl } = useLoaderData<typeof loader>();

  const { supabase } = useSupabase({ env, serverSession });
  const theme = useTheme();
  const nonce = useNonce();
  return (
    <html lang='en' className={clsx(theme)}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='overscroll-none font-sans'>
        <Toaster />
        <Outlet context={{ supabase, domainUrl }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
