import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {getPeoples, resetPeopleState} from "../../redux/actions/people.actions";
import {Ripple} from "primereact/ripple";
import PlanetDialog from "./PlanetDialog";
import {getPlanet, resetPlanetState} from "../../redux/actions/planet.actions";
import {InputText} from "primereact/inputtext";
import '../../styles/DataTables.scss';

const Home = () => {
    // Dispatcher
    const dispatch = useDispatch();

    // State selectors
    const peoples = useSelector(state => state.people.peopleList);
    const peoplesCount = useSelector(state => state.people.count);
    const planet = useSelector(state => state.planet.planet);

    // Table state
    const [tableState, setTableState] = useState({
        first: 0,
        page: 1,
        lastPageLoaded: 1
    });

    // Utility state to open Planet Dialog
    const [openPlanetDialog, setOpenPlanetDialog] = useState(false);
    // Planet state
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    // People list datatable state
    const [peopleList, setPeopleList] = useState([]);
    // Filter state
    const [globalFilter, setGlobalFilter] = useState('');

    /**
     * INIT
     */
    useEffect(() => {
        console.log('INIT HOME!');
        dispatch(resetPeopleState());
        dispatch(getPeoples({page: tableState.page}));
    }, []);

    /**
     * OnStateChange: Current reducer state People List
     */
    useEffect(() => {
        reorderItems(tableState.first);
    }, [peoples]);

    /**
     * OnStateChange Current reducer state Planet
     */
    useEffect(() => {
        if (planet) {
            setSelectedPlanet(planet);
            setOpenPlanetDialog(true);
        }
    }, [planet]);

    /**
     * OnDestroy | UnMount
     */
    useEffect(() => () => {
        console.log('UNMOUNT HOME!');
        dispatch(resetPeopleState());
        dispatch(resetPlanetState());
    }, [])

    /**
     * OnPage callback DataTable
     * @param event: event of changing page on datatable
     */
    const onPage = (event) => {
        let _lazyParams = tableState;
        _lazyParams.first = event.first;
        _lazyParams.page = event.page + 1;
        if (tableState.lastPageLoaded < _lazyParams.page) {
            dispatch(getPeoples({
                page: _lazyParams.page
            }));
            _lazyParams.lastPageLoaded = _lazyParams.page;
        } else {
            reorderItems(_lazyParams.first);
        }
        setTableState(_lazyParams);
        resetFilter();
    }

    /**
     * Utility method to display current elements of people array in datatable
     * @param first: index first element of table page
     */
    const reorderItems = (first) => {
        let tmp = peoples;
        tmp = tmp.slice(first, first + 10);
        setPeopleList([...tmp]);
    }

    /**
     * Custom paginator
     * @type {{layout: string, NextPageLink: (function(*)), PrevPageLink: (function(*)), CurrentPageReport: (function(*))}}
     */
    const paginatorTemplate = {
        layout: 'PrevPageLink CurrentPageReport NextPageLink',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick}
                        disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple/>
                </button>
            )
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center'}}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick}
                        disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple/>
                </button>
            )
        },

    };

    /**
     * Custom template for planet link. Help to handle click on the column (Library not provide this function)
     * @param rowData: Datatable row data for the current element
     * @param column: column metadata (Not Used)
     * @return {JSX.Element}
     */
    const planetTemplate = (rowData, column) => {
        const planetNumber = rowData.homeworld.replace(/[\D]/g, '');
        return <div>
            <a className="planet" onClick={() => onPlanetClick(rowData)}>World: {planetNumber}</a>
        </div>;
    }

    /**
     * Custom template for created date. Clean up date format
     * @param rowData: Datatable row data for the current element
     * @param column: column metadata (Not Used)
     * @return {JSX.Element}
     */
    const createdTemplate = (rowData, column) => {
        const date = new Date(rowData.created);
        return <div>
            <a>{date.toLocaleDateString()}</a>
        </div>;
    }

    /**
     * Custom template for edited date. Clean up date format
     * @param rowData: Datatable row data for the current element
     * @param column: column metadata (Not Used)
     * @return {JSX.Element}
     */
    const editedTemplate = (rowData, column) => {
        const date = new Date(rowData.edited);
        return <div>
            <a>{date.toLocaleDateString()}</a>
        </div>;
    }

    /**
     * Open planet modal on link click
     * @param rowData: datatable clicked row data
     */
    const onPlanetClick = (rowData) => {
        dispatch(getPlanet({url: rowData.homeworld}));
    }

    /**
     * Close planet modal callback
     * @param event: close modal event fixed value (true)
     */
    const onClosePlanetModal = (event) => {
        dispatch(resetPlanetState());
        setOpenPlanetDialog(!event);
    }

    /**
     * Filter current state people list and obtain new entry of max 10 elements to display on datatable
     * @param event: input search value change
     */
    const onFilter = (event) => {
        let value = event.target.value;
        setGlobalFilter(value);
        const tmpArray = [];
        if (value && value.length > 0) {
            peoples.forEach(people => {
                if (people.name.includes(value)) {
                    if(tmpArray.length <= 10) {
                        tmpArray.push(people);
                    }
                }
                setPeopleList(tmpArray);
            });
        } else {
            reorderItems(tableState.first);
        }
    }

    /**
     * Reset filter utility
     */
    const resetFilter = () => {
        setGlobalFilter('');
        reorderItems(tableState.first);
    }
    /**
     * Returned Template
     */
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row className="mt-3">
                        <Col xl={12}>
                            <div className="h2 font-weight-bold mt-2">ADM MEDIA CONSULTING DEVELOPER TEST</div>
                            <span className="p-input-icon-left mr-1 mt-3" style={{float: 'left'}}>
                                <i className="pi pi-search"/>
                                <InputText type="search" id="globalFilter" value={globalFilter}
                                           onInput={(e) => onFilter(e)}
                                           placeholder="Filter by Name"/>
                            </span>
                        </Col>
                    </Row>
                    <Row className="mt-3 datatable-style">
                        <Col xl={12} xs={12} sm={12}>
                            <DataTable value={peopleList}
                                       lazy
                                       paginator
                                       paginatorPosition={'bottom'}
                                       paginatorTemplate={paginatorTemplate}
                                       totalRecords={peoplesCount}
                                       onPage={onPage}
                                       first={tableState.first}
                                       dataKey="name"
                                       emptyMessage="No peoples found."
                                       rows={10}>
                                <Column field="name" header="Name"></Column>
                                <Column field="height" header="Height"></Column>
                                <Column field="mass" header="Mass"></Column>
                                <Column field="created" header="Created" body={createdTemplate}></Column>
                                <Column field="edited" header="Edited" body={editedTemplate}></Column>
                                <Column field="homeworld" header="Planet" body={planetTemplate}></Column>
                            </DataTable>
                        </Col>
                    </Row>
                </Container>
            </div>
            {selectedPlanet && openPlanetDialog &&
            <PlanetDialog visible={openPlanetDialog} data={selectedPlanet}
                          close={(event) => onClosePlanetModal(event)}/>
            }
        </React.Fragment>
    )
}

export default Home;
