import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Comment {
  id: string;
  body: string;
}

interface CommentsProps {
  comments: Comment[];
}

export default function Post({ comments }: CommentsProps) {
  const router = useRouter();

  if(router.isFallback) {
    return <p>Loading...</p>
  }
  return (
    <>
      {/* // Query é onde possui os parametros
        // id tem que ser o nome do arquivo que está salvo */}
      <h1> Posts {router.query.id} </h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}> {comment.body}</li>
        ))}
      </ul>
    </>
  );
}

// GetStaticPaths é utilizando quando precisamos crriar uma página estática que recebe parametros
// Através desse método o next consegue buscar todos os posts que podem ser utilizados como parametros
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:3333/posts")
  const posts = await response.json();

  const paths = posts.map(post =>{
    return {
      params: {id: String(post.id)},
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<CommentsProps> = async (
  context
) => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3333/comments?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments,
    },
    revalidate: 5,
  };
};
