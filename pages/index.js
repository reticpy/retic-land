import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";

export default function Home({}) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Link href={"/manual"} as={`/manual`}>
        <a className="text-4xl font-bold text-orange-600 font-display">
          Manual
        </a>
      </Link>
    </Layout>
  );
}
