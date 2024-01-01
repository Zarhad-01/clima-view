import { useState } from "react";
import "./forecast.css"

const Forecast = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (index) => {
        setActiveTab(index)
    }

    return (
        <div className="forecasts">

            <div className="bloc-tabs">
                <div
                    className={activeTab === 0 ? "tab active-tab" : "tab"}
                    onClick={() => toggleTab(0)}
                >Tab 1</div>
                <div
                    className={activeTab === 1 ? "tab active-tab" : "tab"}
                    onClick={() => toggleTab(1)}
                >Tab 2</div>
                <div
                    className={activeTab === 2 ? "tab active-tab" : "tab"}
                    onClick={() => toggleTab(2)}
                >Tab 3</div>
                <div className={activeTab === 3 ? "tab active-tab" : "tab"}
                    onClick={() => toggleTab(3)}
                >Tab 4</div>
                <div className={activeTab === 4 ? "tab active-tab" : "tab"}
                    onClick={() => toggleTab(4)}
                >Tab 5</div>
            </div>

            <div className="tab-content">
                <div className={activeTab === 0 ? "content active-content" : "content"}>
                    <h2>Blah1</h2>
                    <p>Blahblahblahblah1</p>
                </div>
            </div>
            <div className="tab-content">
                <div className={activeTab === 1 ? "content active-content" : "content"}>
                    <h2>Blah2</h2>
                    <p>Blahblahblahblah2</p>
                </div>
            </div>
            <div className="tab-content">
                <div className={activeTab === 2 ? "content active-content" : "content"}>
                    <h2>Blah3</h2>
                    <p>Blahblahblahblah3</p>
                </div>
            </div>
            <div className="tab-content">
                <div className={activeTab === 3 ? "content active-content" : "content"}>
                    <h2>Blah4</h2>
                    <p>Blahblahblahblah4</p>
                </div>
            </div>
            <div className="tab-content">
                <div className={activeTab === 4 ? "content active-content" : "content"}>
                    <h2>Blah5</h2>
                    <p>Blahblahblahblah5</p>
                </div>
            </div>


        </div>
    )
}
export default Forecast;