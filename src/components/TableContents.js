import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function TableContents({ topics }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function clearMarkdown(str) {
    let newStr = str;
    if (str.includes("#")) {
      newStr = str.replaceAll("#", "").trim();
    }
    return newStr;
  }

  const createLinkName = (str) => {
    const newStr = str.toLowerCase().replaceAll(" ", "-");
    return newStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className={`tableContent`}>
      <div className={`tableContent__header ${!isOpen ? "close" : ""}`}>
        <BsFillArrowLeftCircleFill onClick={handleClick} />
        <span>Contents</span>
      </div>
      <div className={`tableContent__content ${!isOpen ? "close" : ""}`}>
        <ol className="container-title-2">
          {topics.length > 0 &&
            topics.map((topic, index) => (
              <li key={index * Math.random()} className="row-title-1">
                <a
                  href={`#${createLinkName(clearMarkdown(topic.title))}`}
                  className="title-1"
                  onClick={handleClick}
                >
                  {clearMarkdown(topic.title)}
                </a>
                <ol className="container-title-2">
                  {topic?.topics.length > 0 &&
                    topic?.topics.map((topic, index) => (
                      <li key={index * Math.random()} className="row-title-2">
                        <a
                          href={`#${createLinkName(
                            clearMarkdown(topic.title)
                          )}`}
                          className="title-2"
                          onClick={handleClick}
                        >
                          {clearMarkdown(topic.title)}
                        </a>
                        <ul className="container-title-3">
                          {topic?.topics.length > 0 &&
                            topic?.topics.map((topic, index) => (
                              <li
                                key={index * Math.random()}
                                className="row-title-3"
                              >
                                <a
                                  href={`#${createLinkName(
                                    clearMarkdown(topic.title)
                                  )}`}
                                  className="title-3"
                                  onClick={handleClick}
                                >
                                  {clearMarkdown(topic.title)}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ol>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
