import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { redirectTo } from "@reach/router";
import Loading from "../../components/Loading";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as Theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import TableContents from "../../components/TableContents";

export default function Notes({ location }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    console.log("location", location);
    let path = location.state?.path;
    let topics = location.state?.topics;

    /**
     * Verifica si path fué pasado por props, esto es porque el usuario ha sido enrutado desde el home
     * existe el caso en que el usuario recarge la página y esto hace perder el estado, razón por la cual
     * verificamos en el localStorage para saber cual fué la ultima nota visitada para consultar el directorio de notas
     * y obtener el contenido
     */

    if (!path) {
      path = localStorage.getItem("path");
    }

    /**
     * En caso que no haya un path en el localStorage es porque el usuario llego directamente a las notas o limpio el storage
     * razón por la cual no hay como obtener la ultima nota visitada y es redirigido al home
     */

    if (!path) {
      setLoading(false);
      redirectTo(location.origin);
    }

    /**
     * Si el path existe se setea aca de lo contrario el redirect corta el flujo
     */
    localStorage.setItem("path", path);

    if (topics) {
      localStorage.setItem("topics", JSON.stringify(topics));
      setTopics(topics);
    } else {
      topics = localStorage.getItem("topics");
      if (topics) {
        setTopics(JSON.parse(topics));
        console.log("topics set");
      } else {
        console.log("topics null");
      }
    }

    fetch(path)
      .then((res) => res.text())
      .then((content) => {
        setContent(content);
        setLoading(false);
      });
  }, [location]);

  const createLinkName = (str) => {
    const newStr = str.toLowerCase().replaceAll(" ", "-");
    return newStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <>
      {loading && <Loading />}
      <TableContents topics={topics} />
      <div className="container">
        <div className="viewer">
          <ReactMarkdown
            unwrapDisallowed={false}
            remarkPlugins={[remarkGfm]}
            children={content}
            components={{
              code({ node, inline, className, children, ...props }) {
                //const match = /language-(\w+)/.exec(className || '') || ['','javascript']
                const match = ["", "javascript"];
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    style={Theme}
                    language={match[1]} //match
                    PreTag="div"
                    {...props}
                    wrapLines={false}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => {
                return (
                  <>
                    <h1 id={createLinkName(children[0])}>{children[0]}</h1>
                  </>
                );
              },
              h2: ({ children }) => {
                return (
                  <>
                    <h2 id={createLinkName(children[0])}>{children[0]}</h2>
                  </>
                );
              },
              h3: ({ children }) => {
                return (
                  <>
                    <h3 id={createLinkName(children[0])}>{children[0]}</h3>
                  </>
                );
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
