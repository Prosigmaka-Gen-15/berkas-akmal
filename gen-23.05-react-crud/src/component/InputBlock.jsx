import PropTypes from 'prop-types';
import React from 'react';

/* Manual */

// export default function InputBlock(props) {
//   const { input_title } = props;

//   return (
//     <div className='flex flex-col p-1'>
//       <p className='mb-2 text-sm font-medium'>{input_title}</p>
//       <input
//         className='p-1 border border-gray-300 rounded-md hover:border-gray-500 h-9 focus:outline-gray-400'
//         {...props}
//       />
//     </div>
//   );
// }

/*Yup*/

const InputBlock = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-col p-1'>
      <p className='mb-2 text-sm font-medium'>{props.input_title}</p>
      <input
        className='p-1 border border-gray-300 rounded-md hover:border-gray-500 h-9 focus:outline-gray-400'
        ref={ref}
        {...props}
      />
    </div>
  );
});
InputBlock.displayName = 'Yup InputBlock';
export default InputBlock;

InputBlock.propTypes = {
  input_title: PropTypes.string,
};
