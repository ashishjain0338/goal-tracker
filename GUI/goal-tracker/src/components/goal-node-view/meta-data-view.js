import "./meta-data-view.css"

function MetaDataView() {
    return (
        <div className="meta-data">
            <p>Status: In-Progress</p>
            <hr></hr>
            
            <div className="row">
                <div className="col-lg-4">
                    <p>Id: 34</p>
                </div>
                <div className="col-lg-4">
                    <p>X: 3423</p>
                </div>
                <div className="col-lg-4">
                    <p>Y: 3563</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <p>Width: 720</p>
                </div>
                <div className="col-lg-4">
                    <p>Height: 437</p>
                </div>
            </div>
            <hr></hr>
            

            <div className="row" style={{ fontSize: "0.9rem" }}>
                <div className="col-lg-6">
                    <p>Created-at: 6/11/23</p>
                </div>
                <div className="col-lg-6">
                    <p>Started-at: 8/11/23</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <p>Targetted-Start: 10/11/23</p>
                </div>
                <div className="col-lg-6">
                    <p>Completed-at: 23/11/23</p>
                </div>

            </div>
        </div>
    )
}

export { MetaDataView }