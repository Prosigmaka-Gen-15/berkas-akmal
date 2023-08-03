import PropTypes from 'prop-types';

InputBlock.propTypes = {
  inputTitle: PropTypes.string,
  inputName: PropTypes.string,
  id: PropTypes.string,
};

export default function InputBlock(props) {
  const { inputTitle, inputName, id } = props;
  return (
    <div className='flex flex-col p-1'>
      <p className='mb-2 text-sm font-medium'>{inputTitle}</p>
      <input
        className='p-1 border border-gray-300 rounded-md hover:border-gray-500 h-9 focus:outline-gray-400'
        type='text'
        name={inputName}
        id={id}
        placeholder={inputTitle + '...'}
      />
    </div>
  );
}
