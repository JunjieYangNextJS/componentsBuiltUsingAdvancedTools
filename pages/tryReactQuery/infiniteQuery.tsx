import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import useIntersectionObserver from "./../../hooks/useIntersectionObserver";

export default function InfiniteQuery() {
  const fetchPosts = ({ pageParam = 1 }) =>
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageParam}`
      )
      .then((res) => res.data);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  }: any = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (_lastPage, allPages) => {
      const maxPages = 100 / 10;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event: any) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener("scroll", onScroll);
  //   return () => {
  //     document.addEventListener("scroll", onScroll);
  //   };
  // }, []);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <Box sx={{ height: "200px", width: "1000px", overflow: "auto" }}>
      <Box>
        {data?.pages.map((group: any, i: number) => (
          <React.Fragment key={i}>
            {group?.map((post: any) => (
              <p key={post.id}>{post.title}2</p>
            ))}
          </React.Fragment>
        ))}
      </Box>

      <Box ref={loadMoreRef}>
        {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        > */}
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
        {/* </button> */}
      </Box>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </Box>
  );
}
