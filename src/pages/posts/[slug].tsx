import { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import ReactMarkdown from "react-markdown";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  // 記事を読み込む
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "date",
    "tags",
    "content",
  ]);

  return {
    props: {
      post,
    },
  };
};

const Post: NextPage<Props> = ({ post }) => (
  <article>
    <h2>{post.title}</h2>
    <p>{post.date}</p>
    <ul>
      {post.tags?.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
    <section>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </section>
  </article>
);

export default Post;
