import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import moment from 'moment';
import WrappedTable from "../components/WrappedTable";
import WrappedModal from "../components/WrappedModal";
import MetricInput from "../components/MetricInput";
import '../styles/ViewMetric.scss';

const ViewMetric = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [metricName, setMetricName] = useState('');
    const [record, setRecord] = useState('');
    const [error, setError] = useState('');
    const [rows, setRows] = useState([]);
    const modalBase = {
        open: false,
        header: '',
        body: '',
        negFunc: () => console.log('neg func'),
        hideNegButton: true,
        loading: false,
        posText: '',
        negText: '',
        hasChildren: undefined
    }
    const columns = [
        {id: 0, value: 'Value'},
        {id: 1, value: 'Timestamp'}
    ];
    const [modal, setModal] = useState(modalBase);


    useEffect(() => {
        // pull required data from API
        const getRecords = async () => {
            const url = `${process.env.REACT_APP_API_URL}metrics/${id}/recordset`;
            const response = await axios.get(url);

            if (response.status !== 200) {
                // error handling
                setError('We are unable to retrieve the recordset. Please Try Again.')
                return
            }
            setRecords(response.data.values);
        }
        const getMetric = async () => {
            const url = `${process.env.REACT_APP_API_URL}metrics/${id}`;
            const response = await axios.get(url);

            if (response.status !== 200) {
                setError('Something Went Wrong. Please Try Again.')
                return
            }
            setMetricName(response.data.name);
        }

        getRecords();
        getMetric();
    }, [id]);

    useEffect(() => {
        const processRows = () => {
            const processed = [];
            // todo error handling
            records.forEach((d, index) => {
                const obj = {
                    id: index,
                    values: [d.value, moment(d.timestamp).format('MM/DD/YYYY HH:MM:SS')]
                }
                processed.push(obj);
            });
            setRows(processed);
        }
        processRows();
    }, [records]);

    const handleAddRecord = async () => {
        // send record to API
        const url = `${process.env.REACT_APP_API_URL}metrics/${id}/recordset`;
        const data = {
            value: record
        }
        const response = await axios.post(url, data);

        if (response.status !== 201) {
            // error handling
            setError('We were unable to save your record. Please Try Again.');
            return
        }
        const updatedRecords = [...records];
        updatedRecords.unshift(response.data);

        setRecords(updatedRecords);
        setRecord('');
        setModal(modalBase);
    }

    const handleRecordInput = e => {
        const value = e.target.value;
        setRecord(value);
    }

    const openModal = () => {
        const modalData = {
            open: true,
            header: 'Add Record',
            body: '',
            posFunc: () => undefined,
            negFunc: closeModal,
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
        setRecord('');
    }

    return(
        <main className={'view-metric-container'}>
            <h3 className={'title'}>{metricName}</h3>
            <div className={'header-container'}>
                <Button className={'btn'} variant={'contained'} onClick={() => navigate('/')}>Go Back</Button>
                <Button className={'btn'} variant={'contained'} onClick={openModal}>Add Value</Button>
            </div>
            {error && <div className={'error-container'}>
                <p className={'error-message'}>{error}</p>
            </div>
            }
            {records.length > 0 ?
                <WrappedTable
                    tableClass={'data-table'}
                    columns={columns}
                    rows={rows}
                />
                :
                <p className={'no-data'}>There are no records associated with this metric. Please add some.</p>
            }
            <WrappedModal
                open={modal.open}
                header={modal.header}
                body={modal.body}
                posFunc={handleAddRecord}
                negFunc={modal.negFunc}
                posText={modal.posText}
                negText={modal.negText}
                hideNegButton={modal.hideNegButton}
                loading={modal.loading}
                childComponent={modal.hasChildren}
                >
                <MetricInput
                    value={record}
                    changeHandler={handleRecordInput}
                    type={'number'}
                />
            </WrappedModal>
        </main>
    )
}

export default ViewMetric;
