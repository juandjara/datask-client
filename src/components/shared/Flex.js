import React from 'react';

const Flex = ({type, align, justify, children, ...rest}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: align,
      justifyContent: justify,
      flexFlow: type || 'row'
    }} {...rest}>{children}</div>
  );
};

export default Flex;
