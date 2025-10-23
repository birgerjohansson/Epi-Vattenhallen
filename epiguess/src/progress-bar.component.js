import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      display: 'inline-block',
      height: 20,
      width: '85%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
    //   margin: 50
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      border: '1px solid black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'black',
      fontWeight: 'bold'
    }

    let roundOff = (num, places) => {
      const x = Math.pow(10,places);
      return Math.round(num * x) / x;
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${roundOff(completed, 2)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;