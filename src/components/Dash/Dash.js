import React from 'react';
import kids from '../../assets/kids-library.jpg'
import adult from '../../assets/adult-at-library.jpeg'
import seniors from '../../assets/seniors-at-library.jpg'
import teen from '../../assets/teen-library-volunteer.jpg'

function Dash() {

    
    return (
        <div className="dash">
            <div className="grid">
                <div className="cell" id="child">
                    <img className="cell-img" id="child" src={kids} alt="Three kids reading a book"/>
                    <div className="card-title">
                        <h2>KIDS</h2>
                    </div>
                </div>
                <div className="cell" id="teen">
                    <img className="cell-img" id="teen" src={teen} alt="Teen girl holding a book"/>
                    <div className="card-title">
                        <h2>TEENS</h2>
                    </div>
                </div>
                <div className="cell" id="adult">
                    <img className="cell-img" id="adult" src={adult} alt="Adult woman wearing a hat and smiling"/>
                    <div className="card-title">
                        <h2>ADULTS</h2>
                    </div>
                </div>
                <div className="cell" id="senior">
                    <img className="cell-img" id="senior" src={seniors} alt="Senior man and woman sitting at a table"/>
                    <div className="card-title">
                        <h2>SENIORS</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dash;