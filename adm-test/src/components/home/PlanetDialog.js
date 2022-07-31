import React from "react";
import {Dialog} from "primereact/dialog";
import {Card} from "primereact/card";
import planetImg from "./../../assets/images/moon.jpg";

const PlanetDialog = (props) => {

    /**
     * Custom img header
     * @type {JSX.Element}
     */
    const header = (
        <img alt="Card" src={planetImg} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    /**
     * OnHide callback. Return event to home component
     */
    const onHide = () => {
        props.close(true);
    }

    /**
     * Returned HTML Template
     */
    return(
        <React.Fragment>
            <Dialog header="Planet" visible={props.visible} style={{ width: '50vw' }} position={'top'} onHide={() => onHide()}>
                <Card header={header}>
                    <ul>
                        <li><span style={{fontWeight: 'bold'}}>Name:</span> {props.data.name}</li>
                        <li><span style={{fontWeight: 'bold'}}>Diameter:</span> {props.data.diameter}</li>
                        <li><span style={{fontWeight: 'bold'}}>Climate:</span> {props.data.climate}</li>
                        <li><span style={{fontWeight: 'bold'}}>Population:</span> {props.data.population}</li>
                    </ul>
                </Card>

            </Dialog>
        </React.Fragment>
    )
}

export default PlanetDialog;
