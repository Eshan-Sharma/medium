import { Quote } from "../component/Quote";
import { Auth } from "../component/Auth";
export const Signup = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="invisible lg:visible">
          <Quote />
        </div>
      </div>
    </>
  );
};
