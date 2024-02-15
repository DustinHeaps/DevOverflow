import JobCard from "@/components/cards/JobCard";
import JobsFilter from "@/components/jobs/JobsFilter";
import Pagination from "@/components/shared/Pagination";

import { fetchCountries, fetchJobs, fetchLocation } from "@/actions/job.action";

import { Job } from "@/types";
import NoResult from "@/components/shared/NoResult";

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const userLocation = await fetchLocation();

  const jobs = await fetchJobs({
    query:
      searchParams.q || searchParams.location
        ? `${searchParams.q || ""}, ${searchParams.location || ""}`
        : `Software Engineer in ${userLocation}`,
    page: searchParams.page ?? 1,
  });

  const countries = await fetchCountries();
  const page = parseInt(searchParams.page ?? 1);

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Jobs</h1>

      <div className='flex'>
        <JobsFilter countriesList={countries} />
      </div>

      <section data-testid="jobs-list" className='light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9'>
        {jobs?.length > 0 ? (
          jobs.map((job: Job) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={job.id} job={job} />;

            return null;
          })
        ) : (
          <NoResult
            title='No Jobs Found'
            description="We couldn't find any jobs matching your search"
            // link="/jobs"
            // linkTitle="Explore Jobs"
          />
        )}
      </section>

      {jobs?.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;
