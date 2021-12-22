import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';
import '../styles/WrappedModal.scss';

const WrappedModal = ({open, header, body, posFunc, negFunc, posText, negText, hideNegButton, loading, childComponent, children}) => {
    return(
        <Modal open={open}>
            <div className={'modal-container'}>
                <h3 className={'modal-header'}>{header}</h3>
                <div className={'modal-body-container'}>
                    {childComponent ? {...children}: <p className={'modal-text'}>{body}</p>}

                </div>
                <div className={'modal-button-container'}>
                    {!hideNegButton &&
                    <Button
                        onClick={negFunc}
                        disabled={loading}
                        variant={'contained'}
                        className={'btn btn-neg'}
                    >{negText}</Button>}
                    <Button
                        onClick={posFunc}
                        disabled={loading}
                        variant={'contained'}
                        className={'btn btn-pos'}
                    >{posText}</Button>
                </div>
            </div>
        </Modal>
    )
};

WrappedModal.defaultProps = {
    open: false,
    header: 'modal',
    body: 'You need custom text here',
    posFunc: () => console.log('pos click'),
    negFunc: () => console.log('neg click'),
    posText: 'Yes',
    negText: 'No',
    hideNegButton: false,
    loading: false,
    childComponent: undefined
};

WrappedModal.propTypes = {
    open: PropTypes.bool.isRequired,
    header: PropTypes.string,
    body: PropTypes.string,
    posFunc: PropTypes.func,
    negFunc: PropTypes.func,
    posText: PropTypes.string,
    negText: PropTypes.string,
    hideNegButton: PropTypes.bool,
    loading: PropTypes.bool,
    childComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default WrappedModal;
