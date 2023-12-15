"use client";

import { axiosClient } from "@/config/aixos";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const HomeModule = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async ({ queryKey }) => {
      const resonse = await axiosClient.get("/users");
      console.log(resonse.data);
      return resonse.data;
    },
    initialData: [],
    placeholderData: [],
    // staleTime:5*1000
  });

  return (
    <div className="space-y-4">
      <h1>Home</h1>
      <button
        className="p-2 border"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }}
      >
        Invalidate
      </button>

      {data.map((d: any, i: number) => {
        return (
          <div key={i}>
            <p>id {d.id}</p>
            <p>id {d.name}</p>
          </div>
        );
      })}
    </div>
  );
};
