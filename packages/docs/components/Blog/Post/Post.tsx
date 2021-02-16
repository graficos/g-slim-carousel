import PostHeader from '../PostHeader/PostHeader'
import Layout from '../../Layout/Layout'

export default function BlogPost({ children, meta }) {
  return (
    <Layout>
      <PostHeader meta={meta} isBlogPost />
      <article className="my-10 sm:px-10">{children}</article>
    </Layout>
  )
}
