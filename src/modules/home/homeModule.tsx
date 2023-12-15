"use client";

import { axiosClient } from "@/config/aixos";
import { useInfiniteQuery, useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// * Query cache is available within the same page only
// * since react is a single pager is there for the whole app
// * for next it should be stored in redux

// fetch data from react query than store it in redux and then display it in frontend
//  cache is the local temp data storage for queries specific to that page only

export const HomeModule = () => {
  const [showSubHomeComponent, setShowSubHomeComponent] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async ({ queryKey }) => {
      const resonse = await axiosClient.get("/users");
      return resonse.data;
    },
    placeholderData: [],
    // initialData: [],  // used for intital valid data
    // placeholderData: [],  // placehodler data
    // staleTime:5*1000
  });

  // useQueries for multiple queries at once
  // useInfiniteQuery for infinte queries
    

  const { mutate } = useMutation({
    // mutationFn:()=>{}  //actual function that is called when doing mutation
    // number of event on success we need to invalidate the query and we can set the cache as well
  });

  return (
    <div className="space-y-4">
      <h1>Home</h1>
      <button
        className="p-2 border"
        onClick={() => {
          setShowSubHomeComponent(!showSubHomeComponent);
        }}
      >
        Show SubHome Component
      </button>
      {showSubHomeComponent && <SubHomeComponent />}

      <button
        className="p-2 border"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }}
      >
        Invalidate
      </button>

      <button
        className="p-2 border"
        onClick={() => {
          const data = queryClient.getQueryData(["users"]);
          console.log("cached data", data);
        }}
      >
        Get query data
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

export const SubHomeComponent = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["users"]);

  return (
    <div>
      Sub Home Component
      <button
        onClick={() => {
          console.log("user data inside the same page", data);
        }}
      >
        get query data
      </button>
    </div>
  );
};
