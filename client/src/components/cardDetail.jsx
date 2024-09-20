import PropTypes from 'prop-types';

const Card = ({ title, value, icon }) => {
  return (
    <div 
      className="bg-[#1F2937] p-4 rounded-xl shadow-2xl flex items-center justify-between h-40 w-full sm:w-72 md:w-80 lg:w-96 relative overflow-hidden"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="flex flex-col text-left w-2/3">
        <h3 className="text-xs sm:text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-lg sm:text-2xl font-bold text-green-400">{value}</p>
      </div>
      <div className="text-2xl sm:text-4xl text-green-400 bg-green-400 bg-opacity-20 p-2 sm:p-3 rounded-lg flex items-center justify-center w-1/3">
        {icon}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,  // Properti icon diperbarui untuk menerima node React
};

export default Card;
