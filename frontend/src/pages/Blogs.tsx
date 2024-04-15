import { Appbar } from "../component/Appbar";
import { BlogCard } from "../component/BlogCard";

export const Blogs = () => {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex justify-center max-w-xl">
          <BlogCard
            id={1}
            authorName="Eshan"
            publishedDate="28 June 2024"
            title="How an ugly single page website makes $5000 a month without affiliate marketting"
            content="How an ugly single page website makes $5000 a month without affiliate marketting How an ugly single page website makes $5000 a month without affiliate marketting How an ugly single page website makes $5000 a month without affiliate marketting"
          />
        </div>
      </div>
    </>
  );
};
