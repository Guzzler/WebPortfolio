import immigrantsDilemma from "./the-immigrants-dilemma";

const posts = [immigrantsDilemma];

const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getAllPosts = () => sortedPosts;

export const getPostBySlug = (slug) =>
  sortedPosts.find((post) => post.slug === slug);

export default sortedPosts;
