import React, {useState, useEffect} from 'react';
import MyCanvas from "./MyCanvas";
import MyButton from "./MyButton";
import MyInput from "./MyInput";
import SavedOptions from "./SavedOptions";

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
            function useSavedOption(event) {
                if (isStopped) {
                    setLessCircleRadius(key.firstRadius)
                    setBiggerCircleRadius(key.secondRadius)
                    setDistance(key.distance)
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
                    handleClick={useSavedOption}
                    handleContextClick={deleteSavedOption}
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
                    <div>
                        <MyInput
                            max={180}
                            text="First circle radius"
                            value={lessCircleRadius}
                            handleChange={handleChangeLessCircle}
                            disabled={!(isPaused && isStopped)}
                        />
                        <MyInput
                            max={200}
                            text="Second circle radius"
                            value={biggerCircleRadius}
                            handleChange={handleChangeBiggerCircle}
                            disabled={!(isPaused && isStopped)}
                        />
                        <MyInput
                            max={180}
                            text="Distance"
                            value={distance}
                            handleChange={handleChangeDistance}
                            disabled={!(isPaused && isStopped)}
                        />
                        <MyButton
                            text={isStopped ? 'Start' : 'Stop'}
                            myClasses={'col'}
                            handleClick={handleClickStopButton}
                        >
                        </MyButton>
                        <MyButton
                            text={isPaused ? 'Resume' : 'Pause'}
                            myClasses={'col'}
                            handleClick={handleClickPauseButton}
                            disabled={isStopped} //dont active if drawing stopped
                        >
                        </MyButton>
                        <MyButton
                            text={'Save'}
                            myClasses={'col'}
                            handleClick={addToLocalStorage}
                        >
                        </MyButton>
                    </div>
                    <div className="list-group">
                        {getListFromLS()}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Spirograph;
