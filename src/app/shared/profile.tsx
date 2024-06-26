import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';

const AuthorProfilePage = () => {
  return (
    <>
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-33 md:h-44 xl:h-66 2xl:h-77 3xl:h-[333px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          quality={100}
          className="!h-full w-full !object-cover"
          alt="Cover Image"
        />
      </div>
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        <Avatar
          size="xl"
          image={authorData?.avatar?.thumbnail}
          alt="Author"
          className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
        />
        <Profile />
      </div>
    </>
  );
};

export default AuthorProfilePage;
