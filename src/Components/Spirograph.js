import React, {useState} from 'react';
import MyCanvas from "./MyCanvas";
import SavedOptions from "./SavedOptions";
import OptionInputs from "./OptionInputs";
import ControlButtons from "./ControlButtons";

function Spirograph() {
    const [lessCircleRadius, setLessCircleRadius] = useState(109)
    const [biggerCircleRadius, setBiggerCircleRadius] = useState(200)
    const [localStorageData, setLocalStorageData] = useState("") //used to track changes in LS
    const [distance, setDistance] = useState(109)
    const [isStopped, setIsStopped] = useState(true)
    const [isPaused, setIsPaused] = useState(true)

    function handleChangeLessCircle(event) {
        setLessCircleRadius(event.target.value)
    }

    function handleChangeBiggerCircle(event) {
        setBiggerCircleRadius(event.target.value)
    }

    function handleChangeDistance(event) {
        setDistance(event.target.value)
    }

    function handleClickStopButton() { //toggle isStopped, set isPaused=true if it will stop
        setIsPaused(false)
        if (!isStopped) {
            setIsPaused(true)
        }
        setIsStopped(!isStopped)
    }

    function handleClickPauseButton() {
        setIsPaused(!isPaused)
    }

    function addErrorAnimation() {
        function removeErrorAnimation() {
            stopButton.classList.remove("attention")
        }

        let stopButton = document.querySelector("#stopButton")
        stopButton.classList.add("attention")
        setTimeout(removeErrorAnimation, 600)
    }

    function addToLocalStorage() { //add current option to LS
        let newOption = {
            firstRadius : lessCircleRadius,
            secondRadius : biggerCircleRadius,
            distance : distance,
        }
        let spirographOptions = JSON.parse(localStorage.getItem("spirographOptions"))
        if (spirographOptions) {
            spirographOptions[spirographOptions.length] = newOption
        } else { //if no options saved - save newOption as obj in array
            spirographOptions = []
            spirographOptions[0] = newOption
        }
        localStorage.setItem("spirographOptions", JSON.stringify(spirographOptions))
        setLocalStorageData(JSON.stringify(spirographOptions))
    }

    function getListFromLS(){ //return array of SavedOption (using data in LS)
        let spirographOptions = JSON.parse(localStorage.getItem("spirographOptions"))
        if (!spirographOptions) return null // nothing saved = nothing shown
        let i = 0
        return spirographOptions.map((key) => {
            function useSavedOption() {
                if (isStopped) {
                    setLessCircleRadius(key.firstRadius)
                    setBiggerCircleRadius(key.secondRadius)
                    setDistance(key.distance)
                } else {
                    addErrorAnimation()
                }
            }
            function deleteSavedOption(event) {
                let target = event.target
                while (target.localName !== "button") {
                    target = target.parentNode
                    if (target === document) return
                }
                spirographOptions.splice(target.id, 1);
                localStorage.setItem("spirographOptions", JSON.stringify(spirographOptions))
                setLocalStorageData(JSON.stringify(spirographOptions))
                event.preventDefault()
            }
            return (
                <SavedOptions
                    id={i}
                    key={i++}
                    r1={key.firstRadius}
                    r2={key.secondRadius}
                    d={key.distance}
                    myClass="listedItem"
                    handleClick={useSavedOption} //use saved on left click
                    handleContextClick={deleteSavedOption}//delete saved on right click
                    isStopped={isStopped}
                    title={"Left click to use option, right click to remove option"}
                />
            )
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <MyCanvas
                        lessCircle={lessCircleRadius}
                        biggerCircle={biggerCircleRadius}
                        distance={distance}
                        isStopped={isStopped}
                        isPaused={isPaused}
                    />
                </div>
                <div className="col-sm">
                    <OptionInputs
                        isPaused={isPaused}
                        isStopped={isStopped}
                        less={lessCircleRadius}
                        handleLess={handleChangeLessCircle}
                        bigger={biggerCircleRadius}
                        handleBigger={handleChangeBiggerCircle}
                        distance={distance}
                        handleDistance={handleChangeDistance}
                        errorAnimation={addErrorAnimation}
                    />
                    <ControlButtons
                        isPaused={isPaused}
                        isStopped={isStopped}
                        handleStop={handleClickStopButton}
                        handlePause={handleClickPauseButton}
                        handleSave={addToLocalStorage}
                    />
                    <div className="list-group saved-options">
                        {getListFromLS()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spirograph;
