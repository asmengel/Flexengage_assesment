import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
import '../styles/MetricInput.scss';

const MetricInput = ({value, changeHandler, type }) => {
    return(
        <TextField
            className={'text-field'}
            label={'New Metric'}
            variant={'outlined'}
            value={value}
            onChange={changeHandler}
            type={type}
        />
    )
};

MetricInput.defaultProps = {
    type: 'text',
    value: '',
    changeHandler: () => console.log('change event fired')
};

MetricInput.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    changeHandler: PropTypes.func.isRequired
};

export default MetricInput;
