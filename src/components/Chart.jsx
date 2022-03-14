import React, {useEffect,useState} from 'react';
import c3 from "c3";
import "c3/c3.css";
import Slider from './Slider'

export const Chart = () => {

    const [sliderFlowTime,setSliderValue]=useState(30)
    const [sliderTHpi,setSliderValue1]=useState(5000000)
    const [sliderDsCost,setSliderDsCost]=useState({year:1,value:5000000})

    const callbackFunctionFlowTime=(childData)=>{
        setSliderValue(childData)
    }

    const callbackFunctionThpi=(childData)=>{
        setSliderValue1(childData)
    }

    const callbackFunctionYears=(childData)=>{
        setSliderDsCost({year:childData.year,value:childData.value})
    }

    const data= [
        {year:1,increaseThroughput:0,roi:0,dsCost:5000000},
        {year:2,increaseThroughput:0,roi:0,dsCost:2000000},
        {year:3,increaseThroughput:0,roi:0,dsCost:1000000},
        {year:4,increaseThroughput:0,roi:0,dsCost:500000},
        {year:5,increaseThroughput:0,roi:0,dsCost:125000},  
    ]
  
    useEffect(() => {
        data.map((data,i)=>{
            const flowTime=(sliderFlowTime-((sliderFlowTime*.93)*Math.pow(.744,(5-i))))
            if(sliderDsCost.year===(i+1)){
                data.dsCost=sliderDsCost.value
            }
            data.increaseThroughput=(((365/flowTime)-(365/sliderFlowTime))*sliderTHpi);
            data.roi=data.increaseThroughput/data.dsCost;
            return data
        })
      
        c3.generate({
            bindto: "#chart",
            data: {
                json: data,
                keys:{
                    x:'year',
                    value:['increaseThroughput','roi'],
                },
                colors:{
                    increaseThroughput:'#2980b9',
                    roi: '#e74c3c'
                },
                axes: {
                    'roi': 'y2'
                },
                type: 'line',
                types: {
                    'roi': 'line'
                }
            },
            legend: {
                show: false
            },
            
            axis: {
                x: {
                    tick: {
                        outer: false
                    },
                    label: {
                        text: "Year",
                        position: "outer-center"
                    }
                },
                "y": {
                    tick: {
                        format:  (x)=> { return  '$ '+ x.toLocaleString("en-US")},
                        outer: false
                    },
                    label: {
                        text: "Increase in throughput ($MM)",
                        position: "outer-middle"
                    }
                },
                y2: {
                    tick: {
                        format:  (x)=> { return  '$ '+ x.toLocaleString("en-US")},
                        outer: false
                    },
                    min : 0,
                    padding : {
                        bottom : 0,
                        top : 0
                    },
                    label: {
                        text: "ROI ($ Return per $ Invested in DS)",
                        position: "outer-middle"
                    },
                    show: true
                } 
            }
        });
    },[sliderFlowTime,sliderTHpi,sliderDsCost]);
  
    return  <>
                <div id="chart" />
                <Slider parentCallbackFlowTime={callbackFunctionFlowTime} parentCallbackTHpi={callbackFunctionThpi}  parentCallbackYears={callbackFunctionYears}/>
            </>;
};