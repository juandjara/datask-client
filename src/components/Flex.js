import React from 'react';

const Flex = ({type, align, justify, children}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: align,
      justifyContent: justify,
      flexFlow: type || 'row'
    }}>{children}</div>
  );
};

export default Flex;
