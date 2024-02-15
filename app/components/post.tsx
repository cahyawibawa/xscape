import React from 'react';
import { Link } from '@remix-run/react';
import { Card } from './ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';

export type PostProps = {
  avatarUrl: string;
  name: string;
  id: string;
  username: string;
  title: string;
  dateTimeString: string;
  userId: string;
  children?: React.ReactNode;
};

export function Post({
  avatarUrl,
  name,
  username,
  title,
  dateTimeString,
  children,
}: PostProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='py-1'>
      <Card className='rounded-md shadow-sm overflow-hidden min-h-[12rem]'>
        <div className='flex'>
          <div className='p-4 md:p-8 w-full'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <img
                  alt='Profile'
                  className='rounded-full'
                  height='40'
                  src={avatarUrl}
                  style={{
                    aspectRatio: '40/40',
                    objectFit: 'cover',
                  }}
                  width='40'
                />
                <div className='ml-4'>
                  <div className='text-md md:text-lg font-semibold'>
                    <Link to={`/profile/${username}`}>{name}</Link>
                  </div>
                  <div className='text-sm md:text-sm text-muted-foreground'>
                    <Link to={`/profile/${username}`}>@{username}</Link>
                  </div>
                </div>
              </div>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='sm'>
                    <DotsHorizontalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-[150px]'>
                  {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>
                      Pin to your profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled className='text-red-600'>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='mt-4 text-sm prose dark:prose-invert prose-pre:border max-w-full'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{title}</ReactMarkdown>
            </div>
            <div className='flex mt-6 justify-between items-center'>
              <div className='flex space-x-4'>{children}</div>
              <div className='text-muted-foreground text-xs'>
                {dateTimeString}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className='flex space-x-4 min-h-[12rem] my-3 p-8'>
      <Skeleton className='h-12 w-12 rounded-full'></Skeleton>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  );
}
