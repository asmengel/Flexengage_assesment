import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import '../styles/MetricCard.scss';

const MetricCard = ({id, name, posClick, negClick, posText, negText }) => {
    return(
        <Card sx={{ maxWidth: 400 }} className={'card-body'}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' onClick={() => posClick(id)} className={'btn-pos'}>{posText}</Button>
                <Button variant='contained' onClick={() => negClick(id)} className={'btn-neg'}>{negText}</Button>
            </CardActions>
        </Card>
    )
}

MetricCard.defaultProps = {
    id: 0,
    name: 'test',
    posClick: () => console.log('clicked pos button'),
    negClick: () => console.log('clicked neg button'),
    posText: 'yes',
    negText: 'no'
};

MetricCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    posClick: PropTypes.func.isRequired,
    negClick: PropTypes.func.isRequired,
    posText: PropTypes.string.isRequired,
    negText: PropTypes.string.isRequired
}

export default MetricCard;

