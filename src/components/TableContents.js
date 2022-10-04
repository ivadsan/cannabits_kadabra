import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function TableContents({ topics }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`tableContent`}>
      <div className={`tableContent__header ${!isOpen ? "close" : ""}`}>
        <BsFillArrowLeftCircleFill onClick={handleClick} />
        <span>Contents</span>
      </div>
      <div className={`tableContent__content ${!isOpen ? "close" : ""}`}>
        <ol>
          {topics.length > 0 &&
            topics.map((topic, index) => (
              <li key={index * Math.random()}>
                {topic.title}
                <ol>
                  {topic?.topics.length > 0 &&
                    topic?.topics.map((topic, index) => (
                      <li key={index * Math.random()}>
                        {topic.title}
                        <ol>
                          {topic?.topics.length > 0 &&
                            topic?.topics.map((topic, index) => (
                              <li key={index * Math.random()}>{topic.title}</li>
                            ))}
                        </ol>
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
