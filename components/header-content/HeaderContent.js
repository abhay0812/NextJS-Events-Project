import Head from 'next/head'
import React from 'react'

function HeaderContent(props) {
  const { title, metaName, metaContent } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta 
        name={metaName}
        content={metaContent}
      />
    </Head>
  )
}

HeaderContent.defaultProps = {
  name: "NextJs Events",
  metaName: "",
  metaContent: "",
};

export default HeaderContent