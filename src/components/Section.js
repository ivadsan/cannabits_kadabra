import React, { useState } from "react";
import { Link } from "@reach/router";

export default function Section({ group, contents }) {
  const [isOpen, setIsOpen] = useState(false);

  function getTitlesByGroup(group, contents) {
    let result = [];
    contents.forEach((item) => {
      if (group === item.group) {
        const { title, path, tableContents } = item;
        result.push({ title, path, tableContents });
      }
    });

    return (
      <ul className={`list ${isOpen ? "active" : ""}`}>
        {result.map((item, index) => (
          <li key={index}>
            <Link to={"notes"} state={{ path: item.path, topics: item.tableContents}}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="group" onClick={handleToggle}>
        {group}
      </section>
      {getTitlesByGroup(group, contents)}
    </>
  );
}
