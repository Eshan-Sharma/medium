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
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="text-slate-500">
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  className="pl-2 underline"
                  to={type === "signin" ? "/signup" : "/signin"}
                >
                  {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
              </div>
            </div>
            <div className="pt-8">
              {type === "signup" ? (
                <LabelledInput
                  label="Name"
                  type="text"
                  placeholder="Eshan Sharma..."
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
              <LabelledInput
                label="Username"
                placeholder="example@gmail.com"
                type="text"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  });
                }}
              />
              <LabelledInput
                label="Password"
                type="password"
                placeholder="123456"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {type === "signup" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
