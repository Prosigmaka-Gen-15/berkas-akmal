import PropTypes from 'prop-types';

InputBlock.propTypes = {
  input_title: PropTypes.string,
  // inputName: PropTypes.string,
  // id: PropTypes.string,
  // val: PropTypes.string,
  // onchange: PropTypes.any,
};

export default function InputBlock(props) {
  // const { inputTitle, inputName, id, val, onchange } = props;
  const { input_title } = props;

  return (
    <div className='flex flex-col p-1'>
      <p className='mb-2 text-sm font-medium'>{input_title}</p>
      <input
        className='p-1 border border-gray-300 rounded-md hover:border-gray-500 h-9 focus:outline-gray-400'
        {...props}
      />
    </div>
  );
}
