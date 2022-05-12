import { GetStaticProps } from "next";

interface Post {
  id: string;
  title: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts( {posts}: PostsProps ) {
  return (
    <>
      <h1> Listagem de Posts </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}> {post.title}</li>
        ))}
      </ul>
    </>
  );
}

// Criação de páginas staticas, com npm run build
// Por trás dos panos quem faz a busca na API para ser mostrado na tela é o node
export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const response = await fetch("http://localhost:3333/posts")
  const posts = await response.json();

  return {
    props: {
      posts,
    },
    revalidate: 5,
  };
};
