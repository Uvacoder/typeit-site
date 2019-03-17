import React from "react";

export default ({ 
  heading, 
  children,
  outerClasses = "",
  bgClasses = "",
  id = "",
  isLast = false,
  showTriangles = false
}) => {

  let outerPadding = showTriangles ? "py-10 lg:py-20 " : "py-0 ";

  if (isLast) {
    outerPadding += "pb-0 lg:pb-0";
  }

  return (
    <div className={`relative overflow-hidden ${outerPadding} ${outerClasses}`} id={id}>
      <div className={`relative z-10 px-3 py-10 lg:py-20 ${isLast ? "pb-20 md:pb-40" : ""} ${bgClasses}`}>
        {showTriangles && 
          <div className="triangle-top"></div>
        }

          {heading && <h2 className="mb-16 text-center">{heading}</h2>}
          {children}

        {!isLast && showTriangles && 
          <div className="triangle-top triangle-bottom"></div>
        }
      </div>
    </div>
  );
};
