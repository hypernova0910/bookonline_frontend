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

export default function NumberChooser({max, min, value, precision, step, setValue, size = 'medium'}){
    // const [count, setCount] = useState(value)

    // function onChangeNumber(e){
    //     setCount(e.target.value)
    // }

    function onBlur(e){
        if(e.target.value > max && !isNaN(max)){
            setValue(max)
        }
        else if(e.target.value < min && !isNaN(min)){
            setValue(min)
        }
        else{
            //console.log(parseInt(e.target.value))
            setValue(parseInt(parseFloat(e.target.value).toFixed(precision)))
        }
    }

    function onIncrease(e){
        if(value < max || isNaN(max)){
            setValue(value + step)
        }
    }

    function onDecrease(e){
        if(value > min || isNaN(min)){
            setValue(value - step)
        }
    }

    return(
        <div className={styles.wrapper}>
            <IconButton size={size} onClick={onDecrease}>
                <RemoveIcon/>
            </IconButton>
            <IconButton size={size}>
                <input value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} className={styles.number}/>
            </IconButton>
            <IconButton size={size} onClick={onIncrease}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}