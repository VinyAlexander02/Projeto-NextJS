import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
}

interface HomeProps{
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  // const [posts, setPosts] = useState<Post[]>([]);

  // // O hook UseEffect faz com que a página seja renderizada pelo lado do cliente (Client server Side)
  // useEffect(() => {
  //   fetch("http://localhost:3333/posts").then((response) => {
  //     response.json().then((data) => {
  //       setPosts(data);
  //     });
  //   });
  // }, []);

  return (
    <>
    <h1>Posts</h1>
    <ul>
      {posts.map(post => (
        <li key={post.id}> {post.title}</li>
      ))}
    </ul>
    </>
  );
}


// Página renderizada pelo lado do servidor
// Chamado antes do componente ser renderizado
// Esse metédo getServerSideProps é renderizado pelo node 
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/posts")
  const posts = await response.json();

  return{
    props: {
      posts,
    },
  };
}