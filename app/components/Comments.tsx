"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <section className="mt-16 pt-8 border-t border-slate-100">
      <h3 className="text-xl font-bold text-slate-900 mb-8 font-sans">
        Discussion & Community Questions
      </h3>
      <Giscus
        id="comments"
        repo="qusaialahmad97/journalentrieshub"
        repoId="R_kgDORv89NA"
        category="General"
        categoryId="DIC_kwDORv89NM4C5NNF"
        mapping="pathname"
        term="Welcome to the Hub!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light" // Using light theme to match your white UI
        lang="en"
        loading="lazy"
      />
    </section>
  );
}