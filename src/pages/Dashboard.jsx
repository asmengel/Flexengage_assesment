import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import WrappedModal from "../components/WrappedModal";
import MetricCard from '../components/MetricCard';
import MetricInput from "../components/MetricInput";
import {capitalize} from "../utils/format";
import '../styles/Dashboard.scss';

const Dashboard = () => {
    const [metrics, setMetrics] = useState([]);
    const [metric, setMetric] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const modalBase = {
        open: false,
        header: '',
        body: '',
        posFunc: () => console.log('pos func'),
        negFunc: () => console.log('neg func'),
        hideNegButton: true,
        loading: false,
        posText: '',
        negText: '',
        hasChildren: undefined
    }
    const [modal, setModal] = useState(modalBase);
    const navigate = useNavigate();

    useEffect(() => {
        // fetch metric data on page load
        const getMetrics = async () => {
            const apiBase = process.env.REACT_APP_API_URL;
            const url = `${apiBase}metrics`;
            const response = await axios.get(url);

            if (response.status !== 200) {
                // api error
                setLoading(false);
                setError('We are unable to retrieve the metrics. Please try again.');
                return;
            }
            setMetrics(response.data.metrics);
            setLoading(false);
        }
        getMetrics();
    }, []);

    const handleOpenMetric = id => {
        // redirect for open button on metric card
        navigate(`/viewmetric/${id}`);
    }

    const handleDeleteMetric = id => {
        // pop modal to confirm intent to delete
        const modalData = {
            open: true,
            header: 'Delete Metric',
            body: 'Are you sure you want to delete this metric?',
            posFunc: () => setModal(modalBase),
            negFunc: () => handleDeleteMetricFinal(id),
            hideNegButton: false,
            loading: false,
            posText: 'No',
            negText: 'Yes',
            hasChildren: false
        }

        setModal(modalData);
    }
    const handleDeleteMetricFinal = async (id) => {
        // preform the delete
        const url = `${process.env.REACT_APP_API_URL}metrics/${id}`;
        const updateModal = modal;
        updateModal.loading = true;
        setModal(updateModal);
        const response = await axios.delete(url);
        if (response.status !== 200) {
            // error handling
            setError('We were unable to delete the selected metric. Please Try Again.');
            return
        }

        const index = metrics.findIndex(d => d.id === id);
        const updatedMetrics = [...metrics];
        updatedMetrics.splice(index, 1);

        setMetrics(updatedMetrics);
        setModal(modalBase);
    }

    const handleAddMetric = async () => {
        // send data to API and update the view
        const url = `${process.env.REACT_APP_API_URL}metrics`;
        const data = {
            name: metric
        }
        const response = await axios.post(url, data);
        if (response.status !== 201) {
            // error handling
            setError('We were unable to save your metric. Please Try Again.');
            setModal(modalBase);
            setMetric('');
            return
        }

        const updatedMetrics = [...metrics];
        updatedMetrics.unshift(response.data);
        setMetrics(updatedMetrics);
        setMetric('');
        setModal(modalBase);
    }

    const handleMetricInput = e => {
        // collect user input
        const value = e.target.value;
        setMetric(value)
    }

    const openAddModal = () => {
        // open the modal with the form
        const modalData = {
            open: true,
            header: 'Add Metric',
            body: '',
            posFunc: undefined,
            negFunc: () => closeModal(),
            hideNegButton: false,
            loading: false,
            posText: 'Add',
            negText: 'Cancel',
            hasChildren: true
        }
        setModal(modalData);
    }

    const closeModal = () => {
        setModal(modalBase);
    }

    const buildMetricCards = () => {
        // create the cards
        if (loading) {
            return(
                <h2>Loading...</h2>
            )
        }
        if(Array.isArray(metrics) && metrics.length > 0) {
            return metrics.map(d => {
                const capitalName = capitalize(d.name);

                return <MetricCard
                    key={d.id}
                    id={d.id}
                    name={capitalName}
                    posClick={handleOpenMetric}
                    negClick={handleDeleteMetric}
                    posText={'Open'}
                    negText={'Delete'}
                />
            });
        }

        return (
            <p className={'no-value'}>There are no metrics at this time.</p>
        )
    }

    return (
        <main className={'dashboard-container'}>
            <div className={'title-container'}>
                <Typography className={'title'} variant={'h5'} component={'h5'}>Metrics</Typography>
                <Button variant={'contained'} onClick={openAddModal}>Create Metric</Button>
            </div>
            <div className={'error-container'}>
                <p className={'error-message'}>{error}</p>
            </div>
            <div className={'card-container shadow'}>{buildMetricCards()}</div>
            <WrappedModal
                open={modal.open}
                header={modal.header}
                body={modal.body}
                posFunc={modal.posFunc || handleAddMetric}
                negFunc={modal.negFunc}
                posText={modal.posText}
                negText={modal.negText}
                hideNegButton={modal.hideNegButton}
                loading={modal.loading}
                childComponent={modal.hasChildren}
            ><MetricInput
                value={metric}
                changeHandler={handleMetricInput}
            />
            </WrappedModal>
        </main>
    )
}

export default Dashboard;
