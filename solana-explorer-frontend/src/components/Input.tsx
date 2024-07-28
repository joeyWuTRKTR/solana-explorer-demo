import {FC, FormEvent} from "react";
import { useRouter } from "next/router";

const Input: FC = (props) => {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const hashString = formData.get("value") as string;

    if (hashString.length === 9) {
      await router.push(`/block/${hashString}`);
    } else if (hashString.length === 88 || hashString.length === 87) {
      await router.push(`/transaction/${hashString}`);
    } else {
      alert("Block or Transaction hash is invalid");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 w-1/2 mx-auto">
      <input
        type="text"
        name="value"
        className="flex-1 border border-slate-300 bg-transparent rounded px-2 py-1 my-4 mr-4 outline-none focus-within:border-slate-100"
      />
      <div className="flex gap-1 justify-end">
        <button
          type="submit"
          className="px-8 my-4 btn animate-pulse bg-gradient-to-r from-sky-500 to-green-400 center hover:from-pink-500 hover:to-yellow-500 ..."
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Input;
