import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers'
import Spinner from '@/components/Spinner';

export const metadata = {
  title: 'Bits & Bytes',
  description: 'A wonderful blog about JavaScript',
};

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>
      <React.Suspense fallback={<Spinner />}>
        <BlogList />
      </React.Suspense>

    </div>
  );
}

async function BlogList() {
  const blogList = await getBlogPostList();
  console.log({ blogList });
  return (
    <>
      {
        blogList.map((item) =>
        (
          <BlogSummaryCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            abstract={item.abstract}
            publishedOn={item.publishedOn}
          />)

        )
      }
    </>
  );

}

export default Home;
