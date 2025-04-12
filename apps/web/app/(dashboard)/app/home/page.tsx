import React from 'react';
import DashboardHome from '@/components/dashboard/Home';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';

const Home = async() => {
  const user = await currentUser();
  if(!user || !user.id){
    redirect('/sign-in')
  }

  const username = user.username;
  const userId = user.id;
  const userById = await getUserById({ userId });
  if (userById?.onboarded === false) return redirect('/onboarding');
    
  return (
    <main className="w-full">
      {/* @ts-ignore */}
       <DashboardHome username={username!} userById={userById} />
    </main>
  );
};

export default Home;
