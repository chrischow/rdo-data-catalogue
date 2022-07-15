import React from "react";

interface NoResultsTextProps {
  keywords: string;
}

export const NoResultsText: React.FC<NoResultsTextProps> = (props) => {
  return (
    <div className="mt-5 text-center">
      <h4 style={{ fontWeight: 'normal' }}>No results match your search criteria "<em>{props.keywords}</em>".</h4>
    </div>
  );
}