import React from 'react';
import './SliderChart.css'
import ReactSlider from 'react-slider';


const Slider=(props)=>{

    const designSystemCost=[
        {year:"Y1",default:5000000},
        {year:"Y2",default:2000000},
        {year:"Y3",default:1000000},
        {year:"Y4",default:500000},
        {year:"Y5",default:125000}
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
        {id:1,title:"Flow time",change:sendFlowTime,max:999,min:1,default:30},
        {id:2,title:"Revenue per initiative",change:sendTHpi,max:999999999,min:1,default:5000000},
    ]

    return(
        <>
            {initialValues.map((item)=>(
            <div className="sliderWrapper" key={item.id}>
        
                <span>{item.title}</span>
                <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                onChange={item.change}
                defaultValue={item.default}
                max={item.max} 
                min={item.min}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>
                }
                />
            </div>
            ))}
     
            <div className="costDesignSys">
                <span>Cost of design system</span>
                {designSystemCost.map((n)=>(
                    <div className="sliderWrapper slideMargin" key={n.year}>
                    <span>{n.year}</span>
                    <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    onChange={(props) => sendYear(n,props)}
                    max={999999999} 
                    min={1}
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