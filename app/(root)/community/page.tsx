import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/actions/user.action";
import Link from "next/link";
import UserCard from "@/components/cards/UserCard";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import { Button } from '@/components/ui/button';

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for amazing minds'
          otherClasses='flex-1'
        />

        <Filter
          filters={UserFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <section data-testid='user-list' className='mt-12 flex flex-wrap gap-4'>
        {result.users.length > 0 ? (
          result.users.map((user) => {
           {/* @ts-ignore */}
            return <UserCard key={user._id} user={user} />;
          })
        ) : (

          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <h2 className='h2-bold text-dark200_light900'>No users found</h2>
            <Link href='/sign-up' className='h4-bold mt-2 font-bold text-accent-blue'>
              Join the community!
            </Link>
          </div>
        )}
      </section>
      <div className='mt-10'>
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
