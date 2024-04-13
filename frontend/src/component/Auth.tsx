import { Link } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import { useState } from "react";
import { SignupInput } from "../../../common/src/index";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <>
      <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400 ">
              Already have an account?
              <Link to={"/signin"} className="pl-2 underline">
                Login
              </Link>
            </div>
            <LabelledInput
              label="Username"
              placeholder="Eshan Sharma..."
              onChange={(e) => {
                setPostInputs({ ...postInputs, name: e.target.value });
              }}
            />
            <LabelledInput
              label="Email"
              placeholder="m@example.com"
              onChange={(e) => {
                setPostInputs({ ...postInputs, email: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder=""
              onChange={(e) => {
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
