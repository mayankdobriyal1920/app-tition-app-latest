import React from 'react';

export const FacebookLoader = ({type,item})=>{
    const renderLoaderMobile = (item)=>{
        let loaderData = [];
        for (let i = 0;i < item;i++){
            loaderData.push(<div key={i} className={"row"}>
                <div className={"col-3"}>
                    <div className="panel-effect front_line"></div>
                </div>
                <div className={"col-9"}>
                    <div className="panel-effect l1"></div>
                    <div className="panel-effect l2"></div>
                    <div className="panel-effect l3"></div>
                    <div className="panel-effect l4"></div>
                    <div className="panel-effect l5"></div>
                </div>
            </div>);
        }
        return loaderData;
    }
    const renderLoader = (item)=>{
        let loaderData = [];
        for (let i = 0;i < item;i++){
            loaderData.push(<div key={i} className={"row"}>
                <div className={"col-1"}>
                    <div className="panel-effect front_line"></div>
                </div>
                <div className={"col-11"}>
                    <div className="panel-effect l1"></div>
                    <div className="panel-effect l2"></div>
                    <div className="panel-effect l3"></div>
                    <div className="panel-effect l4"></div>
                    <div className="panel-effect l5"></div>
                </div>
            </div>);
        }
        return loaderData;
    }

    const renderBigLoader = (item)=>{
        let loaderData = [];
        for (let i = 0;i < item;i++){
            loaderData.push(<div key={i} className={"row"}>
                <div className={"col-2"}>
                    <div className="panel-effect front_line_big_loader"></div>
                </div>
                <div className={"col-10"}>
                    <div className="panel-effect l1"></div>
                    <div className="panel-effect l2"></div>
                    <div className="panel-effect l3"></div>
                    <div className="panel-effect l4"></div>
                    <div className="panel-effect l5"></div>
                    <div className="panel-effect l6"></div>
                    <div className="panel-effect l7"></div>
                    <div className="panel-effect l8"></div>
                </div>
            </div>);
        }
        return loaderData;
    }
    return (
        <>
            {(type === 'appLoader') ?
                <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg"  y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><rect fill="none" stroke="#fff" strokeWidth="4" x="25" y="25" width="50" height="50"><animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"/></rect><rect x="27" y="27" fill="#fff" width="46" height="50"><animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"/></rect></svg>
            : (type === 'facebookStyle') ?
                    <div className={"facebook_style_loader_container"}>
                        {renderLoader(item)}
                    </div>
                    : (type === 'facebookStyleBigLoader') ?
                        <div className={"facebook_style_big_loader_container"}>
                            {renderBigLoader(item)}
                        </div>
                    :(type === 'facebookStyleMobileLoader') ?
                        <div className={"facebook_style_loader_container"}>
                            {renderLoaderMobile(item)}
                        </div>
                    :
                ''
            }
        </>
    )
}