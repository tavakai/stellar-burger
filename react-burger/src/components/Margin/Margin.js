import PropTypes from 'prop-types';

const Margin = ({margin}) => {
  return (
    <div className={margin}></div>
  )
}

Margin.propTypes = {
  margin: PropTypes.string
}

export default Margin;