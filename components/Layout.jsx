import React from "react";
import Head from "next/head";
import Image from "next/image";
const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-center text-gold-400 py-4">{title}</h1>
      <main>{children}</main>
      <footer>
        <a
          href="https://slan-chong.github.io/snchong-portfolio-main/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="flex justify-center items-center">
            Powered by &nbsp;
            <Image src="/avatar.png" alt="Slan Logo" width={32} height={32} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
