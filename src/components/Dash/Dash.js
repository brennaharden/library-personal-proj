import React from 'react';

function Dash() {
    return (
        <div className="dash">
            <div className="grid">
                <div className="cell" id="child">
                    <img className="cell-img" id="child" src="https://www.metroparent.com/wp-content/uploads/2020/01/take-your-child-to-the-library-day.jpg" alt="Three kids reading a book"/>
                    <div className="card-title">
                        <h2>KIDS</h2>
                    </div>
                </div>
                <div className="cell" id="teen">
                    <img className="cell-img" id="teen" src="https://d21zeai4l2a92w.cloudfront.net/wp-content/uploads/2018/04/teen-library-volunteer.jpg" alt="Teen girl holding a book"/>
                    <div className="card-title">
                        <h2>TEENS</h2>
                    </div>
                </div>
                <div className="cell" id="adult">
                    <img className="cell-img" id="adult" src="https://ca-times.brightspotcdn.com/dims4/default/4b87f51/2147483647/strip/true/crop/2048x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F24%2F72%2Fa2400cd9b25a4411c30ef5d3e303%2Fsd-1529610909-j168m2z186-snap-image" alt="Adult woman wearing a hat and smiling"/>
                    <div className="card-title">
                        <h2>ADULTS</h2>
                    </div>
                </div>
                <div className="cell" id="senior">
                    <img className="cell-img" id="senior" src="https://www.lecourriersud.com/wp-content/uploads/sites/21/2017/11/politique-familiale-et-pour-les-aines-2543226-1600x1067.jpg" alt="Senior man and woman sitting at a table"/>
                    <div className="card-title">
                        <h2>SENIORS</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dash;