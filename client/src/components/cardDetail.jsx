import PropTypes from 'prop-types';

const Card = ({ title, value, icon }) => {
  return (
    <div 
      className="bg-[#1F2937] p-4 rounded-xl shadow-2xl flex items-center justify-between h-40 w-96 relative overflow-hidden"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="text-left">
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-green-400">{value}</p>
      </div>
      <div className="text-4xl text-green-400 bg-green-400 bg-opacity-20 p-3 rounded-lg flex items-center justify-center">
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
