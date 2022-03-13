import React, {useState} from 'react';
import styles from './NumberChooser.module.css'
import IconButton from '@mui/material/IconButton';
import InputUnstyled from '@mui/base/InputUnstyled';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import PropTypes from 'prop-types';

NumberChooser.propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number,
    precision: PropTypes.number,
    step: PropTypes.number,
    checkValue: function(props, propName, componentName) {
        if(props['value'] > props['max'] || props['value'] < props['min']) {
            return new Error('Invalid value'); /* message tùy chỉnh do các bạn */
        }
    }
}

NumberChooser.defaultProps = {
    precision: 0,
    step: 1
}

export default function NumberChooser({max, min, value, precision, step}){
    const [count, setCount] = useState(value)

    function onChangeNumber(e){
        // if(e.target.value > max){
        //     setCount(max)
        // }
        // else if(e.target.value < min){
        //     setCount(min)
        // }
        // else{
        //     setCount(e.target.value)
        // }
        setCount(e.target.value)
    }

    function onBlur(e){
        if(e.target.value > max && !isNaN(max)){
            setCount(max)
        }
        else if(e.target.value < min && !isNaN(min)){
            setCount(min)
        }
        else{
            //console.log(parseInt(e.target.value))
            setCount(parseInt(parseFloat(e.target.value).toFixed(precision)))
        }
    }

    function onIncrease(e){
        if(count < max || isNaN(max)){
            setCount(count + step)
        }
    }

    function onDecrease(e){
        if(count > min || isNaN(min)){
            setCount(count - step)
        }
    }

    return(
        <div className={styles.wrapper}>
            <IconButton onClick={onDecrease}>
                <RemoveIcon/>
            </IconButton>
            <IconButton>
                <input value={count} onChange={onChangeNumber} onBlur={onBlur} className={styles.number}/>
            </IconButton>
            <IconButton onClick={onIncrease}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}