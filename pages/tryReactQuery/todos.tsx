import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import axios from "axios";
import Loader from "react-loader-spinner";

const myApi = "https://jsonplaceholder.typicode.com/posts";

function Todos(): JSX.Element {
  // Access the client
  const queryClient = useQueryClient();

  const { isLoading, isError, isFetching, data, error, status }: any = useQuery(
    "todos",
    () => axios.get(myApi).then((res) => res.data),
    {
      enabled: true,
      // initialData:
    }
  );
  // const posts = useInfiniteQuery(
  //   "posts",
  //   () => axios.get(myApi).then((res) => res.data),
  //   {
  //     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  //   }
  // );

  // console.log(posts);

  const mutation: any = useMutation(
    (newTodo) => {
      return axios.post(myApi, newTodo);
    },
    {
      retry: 3,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("todos");
      },
    }
  );

  if (isLoading) {
    return (
      <span>
        <Loader type="ThreeDots" color="#ccc" height={30} />
      </span>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : isFetching ? (
        <div>Refreshing...</div>
      ) : null}
      <ul>
        {data?.map(
          (todo: {
            id: React.Key | null | undefined;
            title:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined;
          }) => (
            <li key={todo.id}>{todo.title}</li>
          )
        )}
      </ul>

      <div>
        {mutation.isLoading ? (
          "Adding todo..."
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}

            {mutation.isSuccess ? <div>Todo added!</div> : null}

            <button
              onClick={() => {
                mutation.mutate({ id: 100, title: "Do Laundry" });
              }}
            >
              Create Todo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Todos;
