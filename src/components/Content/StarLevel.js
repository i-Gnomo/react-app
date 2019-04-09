import React, { Component } from 'react';


const StarFull = ()=>(<div className="star-full"></div>);
const StarEmpty = ()=>(<div className="star-empty"></div>);

class StarLevel extends Component{
    render(){
        var items = [];
        var star_v = parseFloat(this.props.value).toFixed(0);
        for(var x =0;x<star_v;x++){
            items.push(<StarFull key={'x'+x} />);
        }
        if((5-star_v)>0){
            for(var y =0;y<(5-star_v);y++){
                items.push(<StarEmpty key={'y'+y} />);
            }
        }
        return (
            <div className="star-icons">
            {items}
            </div>
        )
    }
}

export default StarLevel