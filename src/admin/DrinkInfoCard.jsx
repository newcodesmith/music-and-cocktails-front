import React, { Component } from 'react';

class DrinkInfoCard extends Component {

    render() {
        const drinkInfo = this.props;
        // console.log(drinkInfo);
        
        return (
            <div className="admin-drink-info-card">
                <h1>Current Paired Drink Info</h1>
                <h3>{drinkInfo.drink_title}</h3>
                <div className="admin-drink-info">
                    <div className="">
                        <img src={drinkInfo.drink_pic_url} alt={drinkInfo.drink_title} height="150" />
                    </div>
                    <div className="">
                        <ul>
                            <li>{drinkInfo.drink_description}</li>
                            <li>
                                {/* {drinkInfo.ingredients.split('\n').map((item, key) => {
                                    return <span key={key}>{item}<br /></span>
                                })} */}
                            </li>
                            <li>{drinkInfo.direction}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DrinkInfoCard;