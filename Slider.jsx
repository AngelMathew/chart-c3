import React from 'react';
import './SliderChart.css'
import ReactSlider from 'react-slider';


const Slider=(props)=>{
const yearOne=5000000
    const designSystemCost=[
        {year:"Y1",default:yearOne},
        {year:"Y2",default:yearOne/2.5},
        {year:"Y3",default:yearOne/5},
        {year:"Y4",default:yearOne/10},
        {year:"Y5",default:yearOne/25}
    ]
    const sendFlowTime = (a) => {
        props.parentCallbackFlowTime(a);
    }
    const sendTHpi = (a) => {
        props.parentCallbackTHpi(a);
    }
    const sendYear = (a,n) => {
        props.parentCallbackYears({"year":parseInt(a.year.slice(1)),"value":n});
    }
    const initialValues=[
        {id:1,title:"Flow time",change:sendFlowTime,max:270,min:1,default:30,step:1},
        {id:2,title:"Revenue per initiative",change:sendTHpi,max:100000000,min:0,default:5000000,step:25000},
    ]

    return(
        <>
            {initialValues.map((item)=>(
            <div className="sliderWrapper" key={item.id}>
        
                <span>{item.title}</span>
                <ReactSlider
                className="horizontal-slider"
                thumbClassName={"example-thumb example-thumb"+item.id}
                trackClassName={" example-track example-track"+item.id}
                onChange={item.change}
                defaultValue={item.default}
                step={item.step}
                max={item.max} 
                min={item.min}
                renderThumb={(props, state) => <div {...props}>{state.valueNow.toLocaleString("en-US")}</div>
                }
                />
            </div>
            ))}
     
            <div className="costDesignSys">
                <span> <p align="left"> Costs of design system </p> </span>
                {designSystemCost.map((n)=>(
                    <div className="sliderWrapper slideMargin3" key={n.year}>
                    <span>{n.year}</span>
                    <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb3"
                    trackClassName="example-track3"
                    onChange={(props) => sendYear(n,props)}
                    step={2500}
                    max={10000000} 
                    min={2500}
                    defaultValue={n.default}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow.toLocaleString("en-US")}</div>
                    }
                    />
                    </div>
                ))}
            </div>
    </>
    )
}

export default Slider;