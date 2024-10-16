import RecentCollection from "./RecentCollection";

async function page({ params }: { params: { userId: string } }) {
  return <RecentCollection />;
}

export default page;
